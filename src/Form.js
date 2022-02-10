class Form {
	constructor(id) {
		this.form = document.getElementById(id);
		this.output = this.form.querySelector('output');
	}
	/** Takes an HTML string to render to the form's output.
	 * @param markup {string} - the HTML to markup.
	 */
	renderOutput(markup, state) {
		if (!this.output.classList.contains('hidden')) return;
		this.output.classList.remove('hidden');
		this.output.innerHTML = markup;
	}
}

export const tdee = new Form('modifiers');
export const bmr = new Form('bmr-calculator');
export const protein = new Form('protein-calculator');
export const macros = new Form('macro-calculator');
