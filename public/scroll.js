
const axios = require('axios')
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

//Function to show error message
function showError(element, errorMessageElement) {
    errorMessageElement.style.display = 'block';
    element.classList.add('is-invalid');
}

// Function to hide error message
function hideError(element, errorMessageElement) {
    errorMessageElement.style.display = 'none';
    element.classList.remove('is-invalid');
}

// Variables to store input values
let savedUsername, savedEmail, savedPassword;

// Handle account creation validation and switch to login form






