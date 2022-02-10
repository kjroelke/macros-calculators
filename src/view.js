import myCopyright from './modules/copyright';
import * as form from './Form';

class View {
	forms = document.querySelectorAll('form');
	tdee = form.tdee;
	bmr = form.bmr;
	proteins = form.protein;
	macros = form.macros;
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
		let markup = `<h1>Hello there.</h1>`;
		if (form === this.bmr.form.id) {
			markup = `<span><strong>BMR:</strong> ${state.bmr}</span>`;
			this.bmr.renderOutput(markup);
		}
		if (form === this.tdee.form.id) {
			markup = `<span><strong>TDEE Value:</strong> ${state.tdee}</span>
            <span><strong>Calorie Goal:</strong> ${state.calorieGoal}</span>`;
			this.tdee.renderOutput(markup);
		}
	}
}

export default new View();

// BMR View Markup
function bmrOutput(markup) {
	// Move to the View?
	output.dataset.gender = gender;
	output.dataset.age = age.value;
	output.dataset.weight = weight.value;
	output.dataset.height = height;
	output.dataset.bmr = bmr;
}
