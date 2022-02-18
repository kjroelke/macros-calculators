import { calories, protein } from './modules/Form';

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
			protein: 0,
		},
		tdee: 0,
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
				percentage: 30,
				grams: 0,
				calories: 0,
			},
		},
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
					console.error(err);
				}
				break;
			case 'protein-calculator':
				try {
					this.#calcMacros(form);
				} catch (err) {
					console.error(err);
				}
				break;
		}
	}
	#calcHeight(ft, inch) {
		const height = Number(ft.value) * 12 + Number(inch.value);
		return height;
	}
	#getOptionsValue(el) {
		const value = +el.options[el.selectedIndex].value;
		return value;
	}

	#calcBMR(form) {
		// Get Form Values
		const weightVal = form.querySelector('#weight'),
			heightFtVal = form.querySelector('#height--ft'),
			heightInVal = form.querySelector('#height--in'),
			ageVal = form.querySelector('#age'),
			genderOptions = form.querySelectorAll('input[type="radio"]'),
			height = this.#calcHeight(heightFtVal, heightInVal);

		// Set State to Form Values
		this.state.person = {
			weight: Number(weightVal.value),
			age: Number(ageVal.value),
			heightFt: Number(heightFtVal.value),
			heightIn: Number(heightInVal.value),
		};
		genderOptions.forEach((el, i) => {
			if (el.checked) {
				this.state.person.gender = genderOptions[i].value;
			}
		});
		// Destructure State
		const {
			person: { weight, age, gender },
		} = this.state;
		let bmr = 0;

		// Calc BMR
		bmr =
			gender === 'Female'
				? 655 + 4.35 * weight + 4.7 * height - 4.7 * age
				: 66 + 6.23 * weight + 12.7 * height - 6.8 * age;
		this.state.bmr = Math.round(bmr);
	}

	#calcTDEE(form) {
		// Get Values
		const activityVal = form.querySelector('#tdee'),
			deficitVal = form.querySelector('#deficit');
		// Destructure State
		const { bmr } = this.state;
		let {
			calorieGoal,
			tdee,
			modifiers: { activity, deficit },
		} = this.state;
		if (bmr === 0) {
			throw 'Calculate BMR First!!';
		}
		activity = this.#getOptionsValue(activityVal);
		deficit = this.#getOptionsValue(deficitVal);
		// The Math
		tdee = Math.round(bmr * activity);
		if (deficit < 1) calorieGoal = Math.round(tdee - tdee * deficit);
		if (deficit === 1) calorieGoal = tdee;
		if (deficit > 1) calorieGoal = Math.round(tdee * deficit);

		// Update State
		this.state.modifiers = {
			activity: activity,
			deficit: deficit,
		};
		this.state.tdee = tdee;
		this.state.calorieGoal = calorieGoal;
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
		percentage = Math.round((calories / this.state.calorieGoal) * 100);
		this.state.macros.proteins = {
			grams: grams,
			calories: calories,
			percentage: percentage,
		};
	}

	#calcFats(fats) {
		let { grams, calories, percentage } = fats;
		percentage = 30;
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
		/**
		 * The Maths
		 * Goal = 1828
		 * fCals =
		 *
		 */
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
