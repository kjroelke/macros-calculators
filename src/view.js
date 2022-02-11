import myCopyright from './modules/copyright';
import * as form from './modules/Form';

class View {
	forms = document.querySelectorAll('form');
	mods = form.mods;
	calorieGoal = form.calories;
	bmr = form.bmr;
	proteins = form.protein;
	constructor() {
		myCopyright('KJ Roelke', 'kjroelke.online');
	}
	/** Attaches a callback function to each form's 'submit' and passes along the event.
	 * @param handler {function} - the callback function
	 */
	addHandlerRender(handler) {
		this.forms.forEach((form) => form.addEventListener('submit', handler));
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
