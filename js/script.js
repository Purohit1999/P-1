/* jshint esversion: 8 */
/**
 * Credit Card Payment Form Script
 *
 * This script handles real-time formatting, validation, and submission of a credit card payment form. 
 * The primary features include formatting card numbers, ensuring valid cardholder names, handling expiry dates, 
 * validating CVV and OTP inputs, and submitting the form with correct values.
 *
 * The script also includes form validation for inputs such as the credit card number, CVV, and OTP,
 * and simulates OTP verification.
 *
 * Functions:
 * 1. `isValidEmail(email)` - Checks if the provided email has a valid format.
 * 2. `sendOtp(email)` - Simulates sending OTP to the provided email address if valid.
 * 3. `verifyOtp(otp)` - Simulates OTP verification.
 * 4. `showPopup(message)` - Displays a popup message for errors or confirmations.
 * 5. `resetForm()` - Resets the form fields and visual elements to their default state.
 *
 * Event Listeners:
 * 1. Card Number Input - Formats the card number and restricts invalid characters.
 * 2. Card Holder Name Input - Restricts input to alphabets and spaces.
 * 3. Expiry Date Input - Formats the expiry date as MM/YY and validates future dates.
 * 4. CVV Input - Restricts CVV input to 3 numeric digits and displays it on the card.
 * 5. OTP Button - Triggers OTP sending function.
 * 6. Form Submission - Validates all fields, including OTP and CVV, before submitting.
 */


const cardNumber = document.getElementById("card-number");
const cardHolderName = document.getElementById("card-holder-name");
const cardNameInput = document.getElementById("card-name-input");
const displayValidity = document.getElementById("validity");
const validityInput = document.getElementById("validity-input");
const cardNumberDisplay = document.querySelectorAll(".card-number-display");
const cvvInput = document.getElementById("cvv");
const cvvDisplay = document.getElementById("cvv-display");
const cardElement = document.getElementById("card");
const otpButton = document.getElementById("send-otp");
const paymentForm = document.getElementById("payment-form");
const landingPage = document.getElementById("landing-page");
const referenceNumber = document.getElementById("reference-number");
const homeButton = document.getElementById("home-button");

// Format Card Number
/**
 * Event listener for formatting and validating the card number input.
 * It restricts input to numeric characters and formats the number in groups of 4.
 */
cardNumber.addEventListener("input", () => {
    let formattedNumber = cardNumber.value.replace(/\D/g, "");
    formattedNumber = formattedNumber.substring(0, 16);
    cardNumber.value = formattedNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
    
    for (let i = 0; i < cardNumberDisplay.length; i++) {
        cardNumberDisplay[i].textContent = formattedNumber[i] ? formattedNumber[i] : "_";
    }

    // Validate card number
    if (formattedNumber.length > 0 && !/^\d+$/.test(formattedNumber)) {
        showPopup("Please enter a valid card number (numbers only).");
        cardNumber.value = "";
    }
});

// Update Card Holder Name
/**
 * Event listener for updating and validating the cardholder's name input.
 * It restricts the input to letters and spaces only.
 */
cardNameInput.addEventListener("input", () => {
    const name = cardNameInput.value.trim();
    cardHolderName.innerText = name.length < 1 ? "Your Name Here" : name.substring(0, 30).toUpperCase();

    // Validate card holder name
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        showPopup("Please enter a valid name (letters and spaces only).");
        cardNameInput.value = "";
        cardHolderName.innerText = "Your Name Here";
    }
});

// Format Validity
/**
 * Event listener for formatting and validating the expiry date input.
 * It accepts input in the format MM/YY and checks that the date is valid and in the future.
 */
validityInput.addEventListener("input", (e) => {
    let inputString = e.target.value.replace(/\D/g, "");
    let formattedString = "";
    
    if (inputString.length > 0) {
        formattedString = inputString.substring(0, 2);
        if (inputString.length > 2) {
            formattedString += "/" + inputString.substring(2, 4);
        }
    }
    
    e.target.value = formattedString;
    displayValidity.innerText = formattedString || "MM/YY";

    // Validate expiry date
    if (formattedString.length === 5) {
        const [month, year] = formattedString.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formattedString) || 
            parseInt(year) < currentYear || 
            (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            showPopup("Please enter a valid future expiry date (MM/YY format).");
            e.target.value = "";
            displayValidity.innerText = "MM/YY";
        }
    }
});
/**
 * Handles real-time formatting and validation for the CVV input field.
 * Limits input to 3 digits and ensures it's numeric.
 */
// Format and Display CVV
cvvInput.addEventListener("input", () => {
    // Only accept digits and limit input to 3 digits
    cvvInput.value = cvvInput.value.replace(/\D/g, "").substring(0, 3);
    cvvDisplay.innerText = cvvInput.value;

    // Optionally show a message or visual cue for invalid length
    if (cvvInput.value.length !== 3) {
        cvvDisplay.innerText = "Invalid CVV";  // You can remove this if not needed
    }
});

// Event listener to rotate the card when CVV field is focused
cvvInput.addEventListener("focus", () => {
    cardElement.style.transform = "rotateY(180deg)";
});

/**
 * Event listener to rotate the card back to its original position when the CVV field loses focus.
 */
cvvInput.addEventListener("blur", () => {
    cardElement.style.transform = "rotateY(0deg)";
});

// Add this new event listener to handle clicks outside the CVV input
/**
 * Event listener to handle clicks outside the CVV input field, ensuring the card rotates back to its original state.
 */
document.addEventListener("click", (event) => {
    if (event.target !== cvvInput && !cvvInput.contains(event.target)) {
        cardElement.style.transform = "rotateY(0deg)";
    }
});

// Mock function to simulate OTP verification
function verifyOtp(otp) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (otp === "123456") {
                resolve("OTP Verified.");
            } else {
                reject("Invalid OTP. Please try again.");
            }
        }, 1000); // Simulate 1-second delay for verification
    });
}

// Form Validation and Submission using async/await
// Add form submission validation for CVV length
/**
 * Event listener for handling form submission. 
 * It validates that the CVV is exactly 3 digits and that the OTP entered is valid.
 * If all validations pass, it generates a reference number and displays the success page.
 */
paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const cvv = cvvInput.value;

    // Ensure CVV is exactly 3 digits
    if (cvv.length !== 3) {
        showPopup("CVV must be exactly 3 digits.");
        return;
    }

    const otp = document.getElementById("otp").value;

    // Example validation for OTP (should be verified with server)
    if (otp !== "123456") {
        showPopup("Invalid OTP. Please try again.");
        return;
    }

    // Generate random reference number
    const refNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
    referenceNumber.textContent = refNumber;

    // Show landing page
    document.querySelector(".wrapper").style.display = "none";
    landingPage.style.display = "block";
});

/**
 * Validates the email format.
 * @param {string} email - The email address entered by the user.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * Simulates sending an OTP to the given email address.
 * Displays a success or error message based on the email's validity.
 * @param {string} email - The email address to which the OTP will be sent.
 * @returns {Promise} - Resolves if the email is valid and OTP is sent, rejects otherwise.
 */
// Send OTP (Simulate API call with a Promise)
function sendOtp(email) {
    return new Promise((resolve, reject) => {
        if (!email || !isValidEmail(email)) {
            reject("Please enter a valid email.");
        } else {
            // Simulate an API call with setTimeout (replace this with actual API call using fetch or axios)
            setTimeout(() => {
                resolve("OTP sent to your email.");
            }, 1000); // Simulate 1-second delay
        }
    });
}


// Event listener for sending OTP
otpButton.addEventListener("click", () => {
    const email = document.getElementById("email").value;

    // Call sendOtp and handle the result using .then and .catch
    sendOtp(email)
        .then(message => {
            showPopup(message); // Show success message
        })
        .catch(error => {
            showPopup(error); // Show error message
        });
});



// Form Validation and Submission
// Add form submission validation for CVV length
paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const cvv = cvvInput.value;

    // Ensure CVV is exactly 3 digits
    if (cvv.length !== 3) {
        showPopup("CVV must be exactly 3 digits.");
        return; // Prevent form submission if CVV is not valid
    }

    const otp = document.getElementById("otp").value;

    // Example validation for OTP (should be verified with server)
    if (otp !== "123456") {
        showPopup("Invalid OTP. Please try again.");
        return;
    }

    // Generate random reference number
    const refNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
    referenceNumber.textContent = refNumber;

    // Show landing page
    document.querySelector(".wrapper").style.display = "none";
    landingPage.style.display = "block";
});


// Return to home page
/**
 * Event listener for the home button. Resets the form and displays the payment form again.
 */
homeButton.addEventListener("click", () => {
    landingPage.style.display = "none";
    document.querySelector(".wrapper").style.display = "flex";
    resetForm();
});

// Reset fields
/**
 * Function to reset the form fields and the visual display of the card.
 */
function resetForm() {
    cardNumber.value = "";
    cardNameInput.value = "";
    validityInput.value = "";
    cvvInput.value = "";
    document.getElementById("email").value = "";
    document.getElementById("otp").value = "";
    cardHolderName.innerText = "Your Name Here";
    displayValidity.innerText = "MM/YY";
    cvvDisplay.innerText = "";
    cardNumberDisplay.forEach(span => span.textContent = "_");
}

// Show popup
/**
 * Displays a popup with a message on the page.
 * The popup will disappear automatically after 5 seconds.
 * @param {string} message - The message to display in the popup.
 */
function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
        <p>${message}</p>
        <button onclick="removePopup(this.parentElement)">OK</button>
    `;
    document.body.appendChild(popup);

    // Automatically remove the popup after 5 seconds (5000 milliseconds)
    setTimeout(() => {
        removePopup(popup);
    }, 5000);
}

// Remove popup
/**
 * Removes the popup from the DOM.
 * @param {HTMLElement} popup - The popup element to be removed.
 */
function removePopup(popup) {
    popup.remove();
}

// Reset fields on load
window.onload = resetForm;