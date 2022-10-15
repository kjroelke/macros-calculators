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
				model.state.person = View.getBMRValues(ev.target);
				model.calcBMR();
				break;
			case 'modifiers':
				model.state.modifiers = View.getModsValues(ev.target);
				model.calcTDEE();
				break;
			case 'protein-calculator':
				model.state.modifiers.protein = View.getProteinValues(ev.target);
				model.calcMacros();
				break;
		}
		View.handleOutput(+ev.target.dataset.step, model.state);
	}
}

export default new Controller(model, View);
