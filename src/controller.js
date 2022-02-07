import bmr from './modules/bmr';
import tdee from './modules/tdee';

export default class Controller {
	constructor() {
		this.forms = Array.from(document.forms);
	}
	calculate() {
		this.forms.forEach((form, index) => {
			if (index === 0) bmr.calculate(form);
			if (index === 1) tdee.calculate(form);
		});
	}
}
