"use strict";
// Grab HTML elements
const inputField = document.querySelector("#inputField");
const changeTextButton = document.querySelector("#changeTextButton");
const outputDiv = document.querySelector("#output");
// Function to change the text of the output div
function changeOutputText() {
    const userInput = inputField.value;
    outputDiv.textContent = userInput
        ? `You typed: ${userInput}`
        : "Please type something!";
}
// Add event listener to the button
changeTextButton.addEventListener("click", changeOutputText);
