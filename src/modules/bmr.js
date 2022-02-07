class BMR {
	constructor() {
		this.weight = 0;
		this.age = 0;
		this.heightFt = 0;
		this.heightIn = 0;
	}
	getValues(el) {
		return document.getElementById(el);
	}
	setValues(el) {
		if (el === 'weight') this.weight = Number(this.getValues('weight').value);
		if (el === 'age') this.age = Number(this.getValues('age').value);
		if (el === 'heightFt')
			this.heightFt = Number(this.getValues('height--ft').value);
		if (el === 'heightIn')
			this.heightIn = Number(this.getValues('height--in').value);
	}
	calculate(form) {
		const output = form.querySelector('output');
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			this.setValues('weight');
			this.setValues('age');
			this.setValues('heightFt');
			this.setValues('heightIn');
			let gender = '',
				bmr = 0,
				height = this.heightFt * 12 + this.heightIn;
			const genderOptions = document.getElementsByName('gender');

			genderOptions.forEach((el, i) => {
				if (el.checked) {
					gender = genderOptions[i].value;
				}
			});
			if (!output.classList.contains('hidden')) return;
			output.classList.remove('hidden');
			if (gender === 'Female') {
				bmr = 655 + 4.35 * this.weight + 4.7 * height - 4.7 * this.age;
			}
			if (gender === 'Male') {
				bmr = 66 + 6.23 * this.weight + 12.7 * height - 6.8 * this.age;
			}
			bmr = Math.round(bmr);
			output.dataset.gender = gender;
			output.dataset.age = age.value;
			output.dataset.weight = weight.value;
			output.dataset.height = height;
			output.dataset.bmr = bmr;
			output.innerHTML = `<span><strong>BMR:</strong> ${bmr}</span>`;
		});
	}
}

export default bmr = new BMR();
