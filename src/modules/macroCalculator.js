function calcMacros(form, state) {
	if (state.tdee === 0) {
		throw 'Do the rest of the form first!';
	}
	// Get Form
	const proteinMod = form.querySelector('#protein-modifier');

	// Destructure State
	let { macros, modifiers } = this.state;
	const { calorieGoal } = this.state;

	// Set Protein Modifier to State
	modifiers.protein = getOptionsValue(proteinMod);

	// Calc Proteins
	calcProteins(macros.proteins, modifiers.protein);

	// Calc Fats
	calcFats(macros.fats);

	// Calc Carbs
	calcCarbs(macros, calorieGoal);
}
function calcProteins(proteins, modifier) {
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

function calcFats(fats) {
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

function calcCarbs(macros, goal) {
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
