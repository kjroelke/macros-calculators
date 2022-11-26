class Model {
	state = {
		macros: {
			fats: {
				percentage: 30,
				grams: 0,
				calories: 0,
			},
			proteins: {
				percentage: 30,
				grams: 0,
				calories: 0,
			},
			carbs: {
				percentage: 0,
				grams: 0,
				calories: 0,
			},
		},
	};
	calcBMR() {
		this.#createPerson();
		if (this.state.person.gender === 'Male') {
			this.state.bmr = this.#calcMaleBMR(this.state.person);
		} else if (this.state.person.gender === 'Female') {
			this.state.bmr = this.#calcFemaleBMR(this.state.person);
		} else {
			console.error('Gender did not equal Male or Female!');
			alert('Error! Check the console for more details');
		}
	}
	#createPerson() {
		const { gender, weight: w, heightFt, heightIn, age: a } = this.state.person;
		const weight = parseInt(w);
		const age = parseInt(a);
		const height = this.#getHeightInInches(heightFt, heightIn);
		this.state.person = {
			gender: gender,
			weight: weight,
			height: height,
			age: age,
		};
	}
	#getHeightInInches(ft, inch) {
		return parseInt(ft) * 12 + parseInt(inch);
	}
	#calcFemaleBMR({ weight, age, height }) {
		return Math.round(655 + 4.35 * weight + 4.7 * height - 4.7 * age);
	}
	#calcMaleBMR({ weight, age, height }) {
		return Math.round(66 + 6.23 * weight + 12.7 * height - 6.8 * age);
	}

	calcCalories() {
		this.state.tdee = this.#calcTDEE();
		this.state.calorieGoal = this.#calcCalorieGoal(this.state.modifiers);
	}
	#calcTDEE() {
		return Math.round(this.state.bmr * this.state.modifiers.activity);
	}
	#calcCalorieGoal({ deficit: d }) {
		const deficit = parseFloat(d);
		let calories;
		if (deficit < 1) {
			calories = this.#calorieGoalIsTooLow()
				? 'Too low!'
				: this.#calcCalorieDeficit();
		}
		if (deficit === 1) calories = this.state.tdee;
		if (deficit > 1) calories = this.#calcCalorieSurplus();
		return calories;
	}
	#calorieGoalIsTooLow() {
		return this.#calcCalorieDeficit() < this.state.bmr ? true : false;
	}
	#calcCalorieDeficit() {
		return Math.round(
			this.state.tdee - this.state.tdee * this.state.modifiers.deficit,
		);
	}
	#calcCalorieSurplus() {
		return Math.round(this.state.tdee * this.state.modifiers.deficit);
	}
	calcMacros() {
		this.#calcProteins(
			this.state.macros.proteins,
			this.state.modifiers.protein.protein,
		);
		this.#calcFats(this.state.macros.fats);
		this.#calcCarbs(this.state.macros, this.state.calorieGoal);
	}

	#calcProteins(proteins, modifier) {
		const mod = parseFloat(modifier);
		let { grams, calories, percentage } = proteins;
		grams = Math.round(this.state.person.weight * mod);
		calories = Math.round(grams * 4);
		percentage = Math.round((calories / this.state.calorieGoal) * 100);
		console.log(grams, calories, percentage, mod, this.state.person);
		this.state.macros.proteins = {
			grams: grams,
			calories: calories,
			percentage: percentage,
		};
	}

	#calcFats(fats) {
		let { grams, calories, percentage } = fats;
		calories = Math.round((percentage / 100) * this.state.calorieGoal);
		grams = Math.round(calories / 9);
		this.state.macros.fats = {
			grams: grams,
			calories: calories,
			percentage: percentage,
		};
	}

	#calcCarbs(macros, goal) {
		let {
			carbs: { grams: cGrams, percentage: cPercent, calories: cCals },
			fats: { calories: fCals },
			proteins: { calories: pCals },
		} = macros;
		cCals = Math.round(goal - fCals - pCals);
		cGrams = Math.round(cCals / 4);
		cPercent = Math.round((cCals / goal) * 100);
		this.state.macros.carbs = {
			calories: cCals,
			grams: cGrams,
			percentage: cPercent,
		};
	}
}

export default new Model();
