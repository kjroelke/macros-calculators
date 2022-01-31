export default function calculateBMR(form) {
	const output = form.querySelector('output');
	const weight = document.getElementById('weight'),
		age = document.getElementById('age'),
		heightFt = document.getElementById('height--ft'),
		heightIn = document.getElementById('height--in');
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		let gender = '',
			bmr = 0,
			height = heightFt.value * 12 + +heightIn.value;
		console.log(height);
		const genderOptions = document.getElementsByName('gender');
		genderOptions.forEach((el, i) => {
			if (el.checked) {
				gender = genderOptions[i].value;
			}
		});
		if (!output.classList.contains('hidden')) return;
		output.classList.remove('hidden');
		if (gender === 'Female')
			bmr = 655 + 4.35 * weight.value + 4.7 * height - 4.7 * age.value;
		if (gender === 'Male')
			bmr = 66 + 6.23 * weight.value + 12.7 * height - 6.8 * age.value;
		bmr = Math.round(bmr);
		output.dataset.gender = gender;
		output.dataset.age = age.value;
		output.dataset.weight = weight.value;
		output.dataset.height = height;
		output.dataset.bmr = bmr;
		output.innerHTML = `<span><strong>BMR:</strong> ${bmr}</span>`;
	});
}
