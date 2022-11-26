import model from './model';
import View from './view';

class Controller {
	constructor(Model, View) {
		this.model = Model;
		this.view = View;
		this.view.addHandlerRender(this.onFormSubmit);
	}
	/** Subscribed to the AddHandlerRender(), this is the app.
	 * @param ev {object} - the Event
	 */
	onFormSubmit(ev) {
		switch (ev.target.id) {
			case 'bmr-calculator':
				model.state.person = View.bmr.getFormValues();
				model.calcBMR();
				break;
			case 'modifiers':
				model.state.modifiers = View.mods.getFormValues();
				model.calcCalories();
				break;
			case 'protein-calculator':
				model.state.modifiers.protein = View.proteins.getFormValues();
				model.calcMacros();
				break;
		}
		View.handleOutput(+ev.target.dataset.step, model.state);
	}
}

export default new Controller(model, View);
