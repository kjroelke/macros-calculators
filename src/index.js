import myCopyright from './modules/copyright';
import calculateBMR from './modules/bmr';

myCopyright('K.J. Roelke', 'K.J. Roelke', 'kj.roelke.info');

const forms = Array.from(document.forms);
forms.forEach((form, index) => {
	if (index === 0) calculateBMR(form);
});
