class Model {
	state = {
		person: {
			gender: '',
			weight: 0,
			heightFt: 0,
			heightIn: 0,
			age: 0,
		},
		bmr: 0,
		calorieGoal: 0,
		modifiers: {
			activity: 0,
			deficit: 0,
		},
		tdee: 0,
	};
	calculate(form, id) {
		switch (id) {
			case 'bmr-calculator':
				this.#calcBMR(form);
				break;
			case 'modifiers':
				try {
					this.#calcTDEE(form);
				} catch (err) {
					alert(err);
				}
				break;
		}
	}
	#getOptionsValue(el) {
		const value = +el.options[el.selectedIndex].value;
		return value;
	}
	#calcTDEE(form) {
		const activity = form.querySelector('#tdee'),
			deficit = form.querySelector('#deficit');
		this.state.modifiers.activity = this.#getOptionsValue(activity);
		this.state.modifiers.deficit = this.#getOptionsValue(deficit);
		if (this.state.bmr === 0) {
			throw 'Calculate BMR First!!';
		}
		this.state.tdee = Math.round(
			this.state.bmr * this.state.modifiers.activity,
		);
		this.state.calorieGoal = Math.round(
			this.state.tdee - this.state.tdee * this.state.modifiers.deficit,
		);
	}
	#calcHeight(ft, inch) {
		const height = Number(ft.value) * 12 + Number(inch.value);
		return height;
	}
	#calcBMR(form) {
		const weight = form.querySelector('#weight'),
			heightFt = form.querySelector('#height--ft'),
			heightIn = form.querySelector('#height--in'),
			age = form.querySelector('#age'),
			genderOptions = form.querySelectorAll('input[type="radio"]'),
			height = this.#calcHeight(heightFt, heightIn);
		this.state.person.weight = Number(weight.value);
		this.state.person.age = Number(age.value);
		this.state.person.heightFt = Number(heightFt.value);
		this.state.person.heightIn = Number(heightIn.value);
		let bmr = 0;

		genderOptions.forEach((el, i) => {
			if (el.checked) {
				this.state.person.gender = genderOptions[i].value;
			}
		});
		bmr =
			this.state.person.gender === 'Female'
				? (bmr =
						655 +
						4.35 * this.state.person.weight +
						4.7 * height -
						4.7 * this.state.person.age)
				: 66 +
				  6.23 * this.state.person.weight +
				  12.7 * height -
				  6.8 * this.state.person.age;
		this.state.bmr = Math.round(bmr);
	}
}

export default new Model();
