import model from './model';
import tdee from './modules/Views/tdee';
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

/** MVC Calculate
 * 1. View Receives a Form
 * 2. Controller Passes View info to Model
 * 3. Model Does some Math
 *   - Updates State
 * 4. Controller tells View to update Output
 */
