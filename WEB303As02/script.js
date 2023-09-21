'use strict';
/*
	WEB 230 Winter 2022
	Assignment 7
	{Patricia Bialek, 0738386, 2023-04-10}
*/

// 1. Select the form element and save it in a variable
const form = document.querySelector('form');

// 2. When the page loads, set the password value to "monkey", select "New York" in the city dropdown, and clear the textarea
window.addEventListener('load', function() 
{
  const passwordInput = form.querySelector('input[name="password"]');
  passwordInput.value = "monkey";
  
  const cityDropdown = form.querySelector('select[name="city"]');
  cityDropdown.value = "New York";
  
  const textarea = form.querySelector('textarea[name="comment"]');
  textarea.value = "";
});

// 3. Add an event handler to the "name" field to change the background color of the "name" field to green when the length of the string is at least 5 characters. Make sure the color is removed if the count goes below 5. (Hint: input event)
const nameInput = form.querySelector('input[name="firstName"]');

nameInput.addEventListener('input', function() {
  if (nameInput.value.length >= 5) {
    nameInput.style.backgroundColor = "green";
  } else {
    nameInput.style.backgroundColor = "";
  }
});

// 4. Add an event handler to the "Show" button to display the password. When the password is shown change the button to say "Hide" and vice versa. (Hint: change the field type to "text") Also, prevent the form from submitting.
const passwordInput = form.querySelector('input[name="password"]');

const showButton = form.querySelector('#show');

showButton.addEventListener('click', function() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showButton.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    showButton.textContent = "Show";
  }
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
});

// 5. When the checkbox is checked enable the "Send Data" button, when unchecked disable it.
const acceptCheckbox = form.querySelector('input[name="accept"]');
const sendButton = form.querySelector('button[name="send"]');

acceptCheckbox.addEventListener('change', function() {
  sendButton.disabled = !acceptCheckbox.checked;
});

// 6. When the form submits, check that the favourite food is "Apple". If not, do not submit the form and show an alert box that tells the user what food they should like. (Hint: remember that the value of a form field is always a string.) See if any text is selected in the textarea. If it is, do not submit the form and show an alert box asking the user why they selected that text.
form.addEventListener('submit', function(event) {
  if (form.food.value !== "2") {
    event.preventDefault();
    alert("You should like Apples.");
  }
  if (textarea.selectionStart !== textarea.selectionEnd) {
    event.preventDefault();
    alert("Why did you select that text?");
  }
});

// 7. When the user enters their first name (change event) save the value to localStorage. When the page loads, check to see if there is a value stored. If so, fill in the first name with that value.
nameInput.addEventListener('change', function() {
  localStorage.setItem('firstName', nameInput.value);
});

window.addEventListener('load', function() {
  const firstName = localStorage.getItem('firstName');
  if (firstName !== null) {
    nameInput.value = firstName;
  }
});