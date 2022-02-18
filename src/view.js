import myCopyright from './modules/copyright';
import * as form from './modules/Form';

class View {
	forms = document.querySelectorAll('form');
	mods = form.mods;
	calorieGoal = form.calories;
	bmr = form.bmr;
	proteins = form.protein;
	submissionMessage = `<span>Thanks! On to the next step.</span>`;
	finalMessage = `<span>All done! Check the breakdown</span>`;
	constructor() {
		myCopyright('KJ Roelke', 'kjroelke.online');
		this.forms.forEach((form, i) => {
			if (i === 0) return;
			// Disable all form controls
			for (i = 0; i < form.length; i++) {
				form[i].setAttribute('disabled', '');
			}
		});
		this.addRenderSubmission();
	}

	/** Attaches a callback function to each form's 'submit' and passes along the event. Implemented in the `init()` at index.js
	 * @param handler {function} - the callback function
	 */
	addHandlerRender(handler) {
		this.forms.forEach((form) => {
			form.addEventListener('submit', handler);
		});
	}
	addRenderSubmission() {
		this.forms.forEach((form, i) => {
			form.addEventListener('submit', (e) => {
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
				const reset = document.getElementById('reset');
				const resetParent = reset.closest('form');
				if (form === resetParent) {
					window.scrollTo(0, 0);
					location.reload();
				}
			});
		});
	}
	#toggleStyle(forms) {
		forms.forEach((form) => form.classList.toggle('inactive'));
	}
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
