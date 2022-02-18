import model from './model';
import View from './view';

class Controller {
	constructor(Model, View) {
		this.model = Model;
		this.view = View;
	}

	/** Subscribed to the AddHandlerRender(), this prevents page reload and calls in the Maths.
	 * @param ev {object} - the Event
	 */
	onFormSubmit(ev) {
		ev.preventDefault();
		// The Maths by Model
		model.calculate(ev.target, ev.target.id);

		// The Output by View
		View.handleOutput(ev.target.id, model.state);
	}
}

export default new Controller(model, View);
