// Grab HTML elements
const inputField = document.querySelector<HTMLInputElement>("#inputField")!;
const changeTextButton =
	document.querySelector<HTMLButtonElement>("#changeTextButton")!;
const outputDiv = document.querySelector<HTMLDivElement>("#output")!;

// Function to change the text of the output div
function changeOutputText() {
	const userInput = inputField.value;
	outputDiv.textContent = userInput
		? `You typed: ${userInput}`
		: "Please type something!";
}

// Add event listener to the button
changeTextButton.addEventListener("click", changeOutputText);
