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
		let bmr;
		const height = this.#calcHeight();
		// Calc BMR
		this.state.bmr =
			this.state.person.gender === 'Female'
				? this.#calcFemaleBMR(height)
				: this.#calcMaleBMR(height);
	}
	#calcHeight() {
		return (
			parseInt(this.state.person.heightFt) * 12 +
			parseInt(this.state.person.heightIn)
		);
	}
	#calcFemaleBMR(height) {
		return Math.round(
			655 +
				4.35 * this.state.person.weight +
				4.7 * height -
				4.7 * this.state.person.age,
		);
	}
	#calcMaleBMR() {
		return Math.round(
			66 +
				6.23 * this.state.person.weight +
				12.7 * height -
				6.8 * this.state.person.age,
		);
	}
	calcTDEE() {
		// calc TDEE
		this.state.tdee = Math.round(
			this.state.bmr * this.state.modifiers.activity,
		);
		this.state.calorieGoal = this.#calcCalorieGoal(
			this.state.tdee,
			this.state.modifiers.deficit,
		);
	}

	#calcCalorieGoal(tdee, deficit) {
		let calories;
		if (deficit < 1) {
			if (Math.round(tdee - tdee * deficit) < this.state.bmr) {
				calories = 'Too low!';
				return calories;
			}
			calories = Math.round(tdee - tdee * deficit);
		} else if (deficit === 1) calories = tdee;
		else if (deficit > 1) calories = Math.round(tdee * deficit);
		return calories;
	}

	calcMacros() {
		// Destructure State for easier typing
		const { macros, modifiers, calorieGoal } = this.state;
		this.#calcProteins(macros.proteins, modifiers.protein);
		this.#calcFats(macros.fats);
		this.#calcCarbs(macros, calorieGoal);
	}

	#calcProteins(proteins, modifier) {
		let { grams, calories, percentage } = proteins;
		grams = Math.round(this.state.person.weight * modifier);
		calories = Math.round(grams * 4);
		percentage = Math.round((calories / this.state.calorieGoal) * 100);
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
