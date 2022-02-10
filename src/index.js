import controller from './controller';
import view from './view';

function init() {
	view.addHandlerRender(controller.onFormSubmit);
}
init();
