import * as form from './modules/Form';
import { querySelector } from './modules/utilities';

class View {
	forms = document.querySelectorAll('form');
	reset = document.getElementById('reset');
	main = document.querySelector('main');
	coords = this.main.getBoundingClientRect();
	mods = form.mods;
	calorieGoal = form.calories;
	bmr = form.bmr;
	proteins = form.protein;
	submissionMessage = `<span>Thanks! On to the next step.</span>`;
	finalMessage = `<span>All done! Check the breakdown</span>`;
	constructor() {
		this.simpleProtection();
	}
	simpleProtection = async function () {
		try {
			const res = await fetch('https://api.ipify.org/?format=json');
			if (!res.ok) throw new Error();
			const { ip } = await res.json();
			const home = ip === process.env.myIP ? true : false;
			if (home) return;
			const allowed = prompt('Password');
			const denial = `
			<main>
				<h1>You are not allowed to use this calculator.</h1>
				<span>If you have forgotten your password or feel you are being shown this message in error, please contact <a href="mailto:kj.roelke@gmail.com">KJ Roelke</a> and ask for help.</span>
			</main>`;
			if (allowed != process.env.password) {
				document.querySelector('main').innerHTML = denial;
				return;
			}
		} catch (err) {
			console.error(err);
		}
		this.#disabledForms();
		this.renderConfirmation();
		this.reset.addEventListener('click', () => this.resetForm());
	};
	/** disables input inside of forms */
	#disabledForms() {
		this.forms.forEach((form, i) => {
			if (i === 0) return;
			for (i = 0; i < form.length; i++) {
				form[i].setAttribute('disabled', '');
			}
		});
	}

	/** Attaches a callback function to each form's 'submit' and passes along the event. Implemented in the `init()` at index.js
	 * @param handler {function} - the callback function
	 */
	addHandlerRender(handler) {
		this.forms.forEach((form) => {
			form.addEventListener('submit', handler);
		});
	}
	/**
	 * Adds `submit` listener to each form that adds a message on submit and toggles active/inactive state of each form.
	 */
	renderConfirmation() {
		this.forms.forEach((form, i) => {
			form.addEventListener('submit', (e) => {
				e.preventDefault();
				const form = e.target;
				const id = form.dataset.step;
				const submission = form.querySelector('.form__submission');
				submission.insertAdjacentHTML(
					'beforeend',
					i != 2 ? this.submissionMessage : this.finalMessage,
				);
				if (id != 3) {
					this.#toggleStyle([form, this.forms[id]]);
					this.#enableForm(this.forms[id]);
				}
			});
		});
	}
	/** Resets the app's state to init */
	resetForm() {
		window.scrollTo(0, this.coords.y);
		location.reload();
		this.handleSticky(false);
	}

	/** Adds '.inactive' class to each form for more clear UI. */
	#toggleStyle(forms) {
		forms.forEach((form) => form.classList.toggle('inactive'));
	}

	/** Enables form field inputs */
	#enableForm(form) {
		for (let i = 0; i < form.length; i++) {
			form[i].disabled = false;
		}
	}

	handleOutput(form, state) {
		if (form === this.bmr.form.id) {
			this.bmr.renderOutput(state.bmr);
			this.proteins.updateOptions(state.person.gender);
		}
		if (form === this.mods.form.id) {
			this.mods.renderOutput(state.tdee);
			this.calorieGoal.renderOutput(state.calorieGoal);
		}
		if (form === this.proteins.form.id) {
			this.proteins.renderMacros(state.macros);
		}
	}
}

export default new View();
