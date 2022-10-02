import model from './model';
import View from './view';

class Controller {
	constructor(Model, View) {
		this.model = Model;
		this.view = View;
		this.view.addHandlerRender(this.onFormSubmit);
	}

	/** Subscribed to the AddHandlerRender(), this calls in the Maths.
	 * @param ev {object} - the Event
	 */
	onFormSubmit(ev) {
		// The Maths by Model
		model.calculate(ev.target, ev.target.id);
		// The Output by View
		View.handleOutput(ev.target.id, model.state);
	}
}

export default new Controller(model, View);
