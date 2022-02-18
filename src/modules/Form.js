class Form {
	#query = '.totals__';
	constructor(id) {
		this.form = document.getElementById(id);
		this.output = document.querySelector(this.#query.concat(id));
		this.macros = document.querySelector('.percents');
	}
	/** Takes an HTML string to render to the form's output.
	 * @param markup {string} - the HTML to markup.
	 */
	renderOutput(markup) {
		this.output.insertAdjacentHTML(
			'beforeend',
			`<span>${markup} calories</span>`,
		);
	}
}
export const bmr = new Form('bmr-calculator');

export const mods = new Form('modifiers');
export const calories = new Form('calorie-goal');

class ProteinForm extends Form {
	#formContent = '';
	label = this.form.querySelector('#protein--gender');
	constructor(id) {
		super(id);
	}
	updateOptions(gender) {
		if (gender === 'Female') {
			this.#formContent = `
			<label for="protein">
				<strong>${gender}</strong> Protein Modifier (grams per lb.)</label>
					<select name="protein" id="protein-modifier">
						<option value="0.6">0.6</option>
						<option value="0.7">.07</option>
						<option value="0.8" selected>0.8</option>
						<option value="0.9">0.9</option>
						<option value="1.0">1.0</option>
					</select>`;
		}
		if (gender === 'Male') {
			this.#formContent = `
			<label for="protein">
				<strong>${gender}</strong> Protein Modifier (grams per lb.)</label>
					<select name="protein" id="protein-modifier">
						<option value="0.8">0.8</option>
						<option value="0.9">0.9</option>
						<option value="1.0" selected>1.0</option>
						<option value="1.1">1.1</option>
						<option value="1.2">1.2</option>
					</select>`;
		}
		this.form.querySelector('.form__content').innerHTML = this.#formContent;
	}
	renderMacros(markup) {
		this.macros.innerHTML = `
		<div class="percent__proteins">
			<h2>Protein:</h2>
			<span>${markup.proteins.percentage}% | ${markup.proteins.grams}g</span>
		</div>
		<div class="percent__fats">
			<h2>Fats:</h2>
			<span>${markup.fats.percentage}% | ${markup.fats.grams}g</span>
		</div>
		<div class="percent__carbs">
			<h2>Carbs:</h2>
			<span>${markup.carbs.percentage}% | ${markup.carbs.grams}g</span>
		</div>`;
	}
}

export const protein = new ProteinForm('protein-calculator');