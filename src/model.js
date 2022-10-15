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
	calculate(id) {
		if (id === 'protein-calculator') this.#calcMacros();
	}

	calcBMR() {
		let bmr;
		const height = this.state.person.heightFt * 12 + this.state.person.heightIn;
		// Calc BMR
		bmr =
			gender === 'Female'
				? 655 +
				  4.35 * this.state.person.weight +
				  4.7 * height -
				  4.7 * this.state.person.age
				: 66 +
				  6.23 * this.state.person.weight +
				  12.7 * height -
				  6.8 * this.state.person.age;
		this.state.bmr = Math.round(bmr);
	}
	#getOptionsValue(el) {
		const value = +el.options[el.selectedIndex].value;
		return value;
	}

	calcTDEE() {
		if (this.state.bmr === 0) {
			throw 'Calculate BMR First!!';
		}
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
		const check = Math.round(tdee - tdee * deficit) < this.state.bmr;
		if (check) {
			calories = 'Too low!';
			return calories;
		}
		if (deficit < 1) calories = Math.round(tdee - tdee * deficit);
		else if (deficit === 1) calories = tdee;
		else if (deficit > 1) calories = Math.round(tdee * deficit);
		return calories;
	}
	#calcMacros(form) {
		if (this.state.tdee === 0) {
			throw 'Do the rest of the form first!';
		}
		// Get Form
		const proteinMod = form.querySelector('#protein-modifier');

		// Destructure State
		let { macros, modifiers } = this.state;
		const { calorieGoal } = this.state;

		// Set Protein Modifier to State
		modifiers.protein = this.#getOptionsValue(proteinMod);

		// Calc Proteins
		this.#calcProteins(macros.proteins, modifiers.protein);

		// Calc Fats
		this.#calcFats(macros.fats);

		// Calc Carbs
		this.#calcCarbs(macros, calorieGoal);
	}
	#calcProteins(proteins, modifier) {
		let { grams, calories, percentage } = proteins;
		grams = Math.round(this.state.person.weight * modifier);
		calories = Math.round(grams * 4);
		percentage = Math.round((calories / calories) * 100);
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
