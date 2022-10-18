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
				<strong>${gender}</strong> Protein Modifier (grams per lb.)<br/>Recommended range is 0.6 &ndash; 1.0</label>
					<input type='number' inputmode="decimal" step="0.1" name="protein" id="protein-modifier">`;
		}
		if (gender === 'Male') {
			this.#formContent = `
			<label for="protein">
				<strong>${gender}</strong> Protein Modifier (grams per lb.)<br/>Recommended range is 0.8 &ndash; 1.2</label>
					<input type='number' step="0.1" inputmode="decimal" name="protein" id="protein-modifier">`;
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
	customMacros() {
		const markup = `
		<label for="custom-macros">Custom Macro Selectors</label>
			<select name="custom-macros" id="custom-macros">
				<option value="0.6">0.6</option>
				<option value="0.7">.07</option>
				<option value="0.8" selected>0.8</option>
				<option value="0.9">0.9</option>
				<option value="1.0">1.0</option>
			</select>`;
		return markup;
	}
	pregnancyMarkup() {
		const markup = `<div class="radio__options">
								<h3>Pregnant?</h3>
								<div class="radio__options--option" id="pregnant-option-1">
									<input type="radio" name="pregnant" value="true">
									<label for="pregnant">Yes</label>
								</div>
								<div class="radio__options--option" id="pregnant-option-2">
									<input type="radio" name="pregnant" value="false">
									<label for="pregnant">No</label>
								</div>
							</div>`;
		return markup;
	}
}

export const protein = new ProteinForm('protein-calculator');
