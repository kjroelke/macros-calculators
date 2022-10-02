import controller from './controller';
import view from './view';
// import '../sass/main.scss';

function init() {
	view.addHandlerRender(controller.onFormSubmit);
}
init();
