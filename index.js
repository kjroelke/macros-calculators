class $33e13757dc4dfa71$var$Form {
    #query = '.totals__';
    constructor(id){
        this.form = document.getElementById(id);
        this.output = document.querySelector(this.#query.concat(id));
        this.macros = document.querySelector('.percents');
    }
    /** Takes an HTML string to render to the form's output.
	 * @param markup {string} - the HTML to markup.
	 */ renderOutput(markup) {
        this.output.insertAdjacentHTML('beforeend', `<span>${markup} calories</span>`);
    }
}
const $33e13757dc4dfa71$export$eebca4b82a60c619 = new $33e13757dc4dfa71$var$Form('bmr-calculator');
const $33e13757dc4dfa71$export$8999671f510b7122 = new $33e13757dc4dfa71$var$Form('modifiers');
const $33e13757dc4dfa71$export$788b37ed00f86289 = new $33e13757dc4dfa71$var$Form('calorie-goal');
class $33e13757dc4dfa71$var$ProteinForm extends $33e13757dc4dfa71$var$Form {
    #formContent = '';
    label = this.form.querySelector('#protein--gender');
    constructor(id){
        super(id);
    }
    updateOptions(gender) {
        if (gender === 'Female') this.#formContent = `
			<label for="protein">
				<strong>${gender}</strong> Protein Modifier (grams per lb.)</label>
					<select name="protein" id="protein-modifier">
						<option value="0.6">0.6</option>
						<option value="0.7">.07</option>
						<option value="0.8" selected>0.8</option>
						<option value="0.9">0.9</option>
						<option value="1.0">1.0</option>
					</select>`;
        if (gender === 'Male') this.#formContent = `
			<label for="protein">
				<strong>${gender}</strong> Protein Modifier (grams per lb.)</label>
					<select name="protein" id="protein-modifier">
						<option value="0.8">0.8</option>
						<option value="0.9">0.9</option>
						<option value="1.0" selected>1.0</option>
						<option value="1.1">1.1</option>
						<option value="1.2">1.2</option>
					</select>`;
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
const $33e13757dc4dfa71$export$a174f507dd3121ea = new $33e13757dc4dfa71$var$ProteinForm('protein-calculator');


class $3a93cf6aaa396284$var$Model {
    state = {
        person: {
            gender: '',
            weight: 0,
            heightFt: 0,
            heightIn: 0,
            age: 0
        },
        bmr: 0,
        calorieGoal: 0,
        modifiers: {
            activity: 0,
            deficit: 0,
            protein: 0
        },
        tdee: 0,
        macros: {
            fats: {
                percentage: 30,
                grams: 0,
                calories: 0
            },
            proteins: {
                percentage: 30,
                grams: 0,
                calories: 0
            },
            carbs: {
                percentage: 30,
                grams: 0,
                calories: 0
            }
        }
    };
    calculate(form, id) {
        switch(id){
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
                } catch (err1) {
                    console.error(err1);
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
        const weightVal = form.querySelector('#weight'), heightFtVal = form.querySelector('#height--ft'), heightInVal = form.querySelector('#height--in'), ageVal = form.querySelector('#age'), genderOptions = form.querySelectorAll('input[type="radio"]'), height = this.#calcHeight(heightFtVal, heightInVal);
        // Set State to Form Values
        this.state.person = {
            weight: Number(weightVal.value),
            age: Number(ageVal.value),
            heightFt: Number(heightFtVal.value),
            heightIn: Number(heightInVal.value)
        };
        genderOptions.forEach((el1, i)=>{
            if (el1.checked) this.state.person.gender = genderOptions[i].value;
        });
        // Destructure State
        const { person: { weight: weight , age: age , gender: gender  } ,  } = this.state;
        let bmr = 0;
        // Calc BMR
        bmr = gender === 'Female' ? 655 + 4.35 * weight + 4.7 * height - 4.7 * age : 66 + 6.23 * weight + 12.7 * height - 6.8 * age;
        this.state.bmr = Math.round(bmr);
    }
     #calcTDEE(form1) {
        // Get Values
        const activityVal = form1.querySelector('#tdee'), deficitVal = form1.querySelector('#deficit');
        // Destructure State
        const { bmr: bmr  } = this.state;
        let { calorieGoal: calorieGoal , tdee: tdee , modifiers: { activity: activity , deficit: deficit  } ,  } = this.state;
        if (bmr === 0) throw 'Calculate BMR First!!';
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
            deficit: deficit
        };
        this.state.tdee = tdee;
        this.state.calorieGoal = calorieGoal;
    }
     #calcMacros(form2) {
        if (this.state.tdee === 0) throw 'Do the rest of the form first!';
        // Get Form
        const proteinMod = form2.querySelector('#protein-modifier');
        // Destructure State
        let { macros: macros , modifiers: modifiers  } = this.state;
        const { calorieGoal: calorieGoal  } = this.state;
        // Set Protein Modifier to State
        modifiers.protein = this.#getOptionsValue(proteinMod);
        // Calc Proteins
        this.#calcProteins(macros.proteins, modifiers.protein);
        // Calc Fats
        this.#calcFats(macros.fats);
        // Calc Carbs
        this.#calcCarbs(macros, calorieGoal);
        console.log(this.state);
    }
     #calcProteins(proteins, modifier) {
        let { grams: grams , calories: calories , percentage: percentage  } = proteins;
        grams = Math.round(this.state.person.weight * modifier);
        calories = Math.round(grams * 4);
        percentage = Math.round(calories / this.state.calorieGoal * 100);
        this.state.macros.proteins = {
            grams: grams,
            calories: calories,
            percentage: percentage
        };
    }
     #calcFats(fats) {
        let { grams: grams , calories: calories , percentage: percentage  } = fats;
        percentage = 30;
        calories = Math.round(percentage / 100 * this.state.calorieGoal);
        grams = Math.round(calories / 9);
        this.state.macros.fats = {
            grams: grams,
            calories: calories,
            percentage: percentage
        };
    }
     #calcCarbs(macros, goal) {
        let { carbs: { grams: cGrams , percentage: cPercent , calories: cCals  } , fats: { calories: fCals  } , proteins: { calories: pCals  } ,  } = macros;
        /**
		 * The Maths
		 * Goal = 1828
		 * fCals =
		 *
		 */ cCals = Math.round(goal - fCals - pCals);
        cGrams = Math.round(cCals / 4);
        cPercent = Math.round(cCals / goal * 100);
        this.state.macros.carbs = {
            calories: cCals,
            grams: cGrams,
            percentage: cPercent
        };
    }
}
var $3a93cf6aaa396284$export$2e2bcd8739ae039 = new $3a93cf6aaa396284$var$Model();


function $849c8a0ed6d1ba06$export$2e2bcd8739ae039(brandName, builder, site) {
    const copyright = document.getElementById('copyright');
    const thisYear = new Date().getFullYear();
    const brand = brandName.replace(/ /g, '');
    const builderLink = `<a href="https://${site}?utm_source=${brand}&utm_medium=website_footer&utm_campaign=copyright" target ="_blank">${builder}</a>`;
    copyright.innerHTML = `<p>&copy; ${thisYear} ${brandName} All Rights Reserved.<br/>Site built by ${builderLink}</p>`;
}



class $5b3e8227b9a42fd1$var$View {
    forms = document.querySelectorAll('form');
    mods = $33e13757dc4dfa71$export$8999671f510b7122;
    calorieGoal = $33e13757dc4dfa71$export$788b37ed00f86289;
    bmr = $33e13757dc4dfa71$export$eebca4b82a60c619;
    proteins = $33e13757dc4dfa71$export$a174f507dd3121ea;
    constructor(){
        $849c8a0ed6d1ba06$export$2e2bcd8739ae039('KJ Roelke', 'kjroelke.online');
    }
    /** Attaches a callback function to each form's 'submit' and passes along the event.
	 * @param handler {function} - the callback function
	 */ addHandlerRender(handler) {
        this.forms.forEach((form)=>form.addEventListener('submit', handler)
        );
    }
    handleOutput(form, state) {
        if (form === this.bmr.form.id) {
            this.bmr.renderOutput(state.bmr);
            this.proteins.updateOptions(state.person.gender);
        }
        if (form === this.mods.form.id) {
            this.mods.renderOutput(state.tdee);
            this.calorieGoal.renderOutput(state.calorieGoal);
        }
        if (form === this.proteins.form.id) this.proteins.renderMacros(state.macros);
    }
}
var $5b3e8227b9a42fd1$export$2e2bcd8739ae039 = new $5b3e8227b9a42fd1$var$View();


class $58ee04a91c847124$var$Controller {
    constructor(Model, View){
        this.model = Model;
        this.view = View;
    }
    /** Subscribed to the AddHandlerRender(), this prevents page reload and calls in the Maths.
	 * @param ev {object} - the Event
	 */ onFormSubmit(ev) {
        ev.preventDefault();
        // The Maths by Model
        $3a93cf6aaa396284$export$2e2bcd8739ae039.calculate(ev.target, ev.target.id);
        // The Output by View
        $5b3e8227b9a42fd1$export$2e2bcd8739ae039.handleOutput(ev.target.id, $3a93cf6aaa396284$export$2e2bcd8739ae039.state);
    }
}
var $58ee04a91c847124$export$2e2bcd8739ae039 /** MVC Calculate
 * 1. View Receives a Form
 * 2. Controller Passes View info to Model
 * 3. Model Does some Math
 *   - Updates State
 * 4. Controller tells View to update Output
 */  = new $58ee04a91c847124$var$Controller($3a93cf6aaa396284$export$2e2bcd8739ae039, $5b3e8227b9a42fd1$export$2e2bcd8739ae039);



function $4fa36e821943b400$var$init() {
    $5b3e8227b9a42fd1$export$2e2bcd8739ae039.addHandlerRender($58ee04a91c847124$export$2e2bcd8739ae039.onFormSubmit);
}
$4fa36e821943b400$var$init();


//# sourceMappingURL=index.js.map
