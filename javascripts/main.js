let textInput = document.getElementById('text-input');

window.addEventListener('load', function(){
	CarLot.Inventory.loadInventory();
});

window.addEventListener('click', function() {
	// console.log(event);
	if (event.target.className === 'car col-sm-4') {
		let targetCard = event.target;
		CarLot.Inventory.clearSelectedClass();
		targetCard.classList.toggle('selected');
		textInput.value = '';
		textInput.focus();
	} else if (event.target.parentElement.className === 'car col-sm-4') {
		let targetCard = event.target.parentElement;
		CarLot.Inventory.clearSelectedClass();
		targetCard.classList.toggle('selected');
		textInput.value = '';
		textInput.focus();
	} else {
		console.log("not a card");
	}
});

textInput.addEventListener('keyup', function() {
	if (event.key === "Enter") {
		textInput.value = '';

	} else {
		document.querySelector('.selected p').innerHTML = textInput.value;
	}
});