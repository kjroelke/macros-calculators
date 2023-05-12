import * as form from './modules/Form';

class View {
	forms = document.querySelectorAll('form');
	reset = document.getElementById('reset');
	mods = form.mods;
	calorieGoal = form.calories;
	bmr = form.bmr;
	proteins = form.protein;
	submissionMessage = `<span>Thanks! On to the next step.</span>`;
	finalMessage = `<span>All done! Check the breakdown</span>`;
	constructor() {
		// this.simpleProtection();
		this.reset.addEventListener('click', this.resetForm);
	}
	/** Adds simple password protection that gets bypassed if IP Address = Roelke Residence. */
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

	/** Resets the app's state to init */
	resetForm() {
		location.reload();
	}
	/** Gets form values
	 * @return object
	 */
	getBMRValues(form) {
		const weightVal = form.querySelector('#weight'),
			heightFtVal = form.querySelector('#height--ft'),
			heightInVal = form.querySelector('#height--in'),
			ageVal = form.querySelector('#age'),
			genderOptions = form.querySelectorAll('#gender input[type="radio"]');
		// healthOptions = form.querySelectorAll('#health input[type="radio"]'),
		const person = {
			weight: Number(weightVal.value),
			age: Number(ageVal.value),
			heightFt: Number(heightFtVal.value),
			heightIn: Number(heightInVal.value),
		};
		genderOptions.forEach((el, i) => {
			if (el.checked) {
				person.gender = genderOptions[i].value;
			}
		});
		return person;
	}
	#getOptionsValue(el) {
		const value = +el.options[el.selectedIndex].value;
		return value;
	}
	/** Gets form values
	 * @return object
	 */
	getModsValues(form) {
		const activityVal = form.querySelector('#tdee'),
			deficitVal = form.querySelector('#deficit');
		const modifiers = {
			activity: this.#getOptionsValue(activityVal),
			deficit: this.#getOptionsValue(deficitVal),
		};
		return modifiers;
	}

	getProteinValues(form) {
		const protein = Number(form.querySelector('#protein-modifier').value);
		return protein;
	}
	/** Attaches a callback function to each form's 'submit' and passes along the event. Calls `#renderConfirmation()`
	 * @param handler {function} - the callback function
	 */
	addHandlerRender(handler) {
		this.forms.forEach((form, i) => {
			form.addEventListener('submit', (ev) => {
				ev.preventDefault();
				handler(ev);
				this.#renderConfirmation(ev.target, i);
			});
		});
	}
	/**
	 * Adds a message on submit and toggles active/inactive state of each form.
	 */
	#renderConfirmation(form, i) {
		const id = +form.dataset.step;
		const nextForm = i + 1;
		const submission = form.querySelector('.form__submission');
		submission.insertAdjacentHTML(
			'beforeend',
			i != 2 ? this.submissionMessage : this.finalMessage,
		);
		if (id != 2) {
			this.#toggleStyle([form, this.forms[nextForm]]);
			this.#enableForm(this.forms[i]);
		}
	}

	/** Toggles '.inactive' class for each form to clarify UI. */
	#toggleStyle(forms) {
		forms.forEach((form) => form.classList.toggle('inactive'));
	}

	/** Enables form field inputs */
	#enableForm(form) {
		for (let i = 0; i < form.length; i++) {
			form[i].disabled = false;
		}
	}
	/** disables input inside of forms */
	#disabledForms() {
		this.forms.forEach((form, i) => {
			if (i === 0) return;
			for (i = 0; i < form.length; i++) {
				form[i].setAttribute('disabled', '');
			}
		});
	}

	handleOutput(form, data) {
		if (form === 0) {
			this.bmr.renderOutput(data.bmr);
			this.proteins.updateOptions(data.person.gender);
		}
		if (form === 1) {
			this.mods.renderOutput(data.tdee);
			this.calorieGoal.renderOutput(data.calorieGoal);
		}
		if (form === 2) {
			this.proteins.renderMacros(data.macros);
		}
	}
}

export default new View();
