class TDEE {
	constructor() {
		this.tdee = document.getElementById('tdee');
		this.deficit = document.getElementById('deficit');
		this.tdeeValue = 0;
		this.deficitValue = 0;
	}
	setValue(el) {
		const value = +el.options[el.selectedIndex].value;
		return value;
	}
	calculate(form) {
		const output = form.querySelector('output');
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			this.tdeeValue = this.setValue(this.tdee);
			this.deficitValue = this.setValue(this.deficit);
			if (!output.classList.contains('hidden')) return;
			output.classList.remove('hidden');
			const calorieGoal = this.tdeeValue * this.deficitValue;
			output.innerHTML = `
            <span><strong>TDEE Value:</strong> ${this.tdeeValue}</span> <span><strong>Deficit Value:</strong> ${this.deficitValue}</span>
            <span><strong>Calorie Goal:</strong> ${calorieGoal}</span>`;
		});
	}
}

export default tdee = new TDEE();

// getValues(el) {
// 		return document.getElementById(el);
// 	}
// 	setValues(el) {
// 		if (el === 'weight') this.weight = Number(this.getValues('weight').value);
// 		if (el === 'age') this.age = Number(this.getValues('age').value);
// 		if (el === 'heightFt')
// 			this.heightFt = Number(this.getValues('height--ft').value);
// 		if (el === 'heightIn')
// 			this.heightIn = Number(this.getValues('height--in').value);
// 	}
