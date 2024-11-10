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
 */

// Wait for the DOM to fully load before executing any JavaScript code
document.addEventListener("DOMContentLoaded", function () {
    /**
     * Element References
     * These variables store references to HTML elements by their `id` attributes
     */
    const cardNumberInput = document.getElementById("card-number");
    const cardHolderInput = document.getElementById("card-holder");
    const expiryDateInput = document.getElementById("expiry-date");
    const displayValidity = document.getElementById("display-validity");
    const cvvInput = document.getElementById("cvv");
    const emailInput = document.getElementById("email-otp");
    const otpInput = document.getElementById("otp");
    const cardHolderNameDisplay = document.getElementById("card-holder-name");
    const expiryDateDisplay = document.getElementById("validity");
    const cardNumberDisplay = document.querySelectorAll(".card-number-display");
    const cvvDisplay = document.getElementById("cvv-display");
    const cardElement = document.getElementById("card");
    const otpButton = document.getElementById("send-otp");
    const paymentForm = document.getElementById("payment-form");
    const landingPage = document.getElementById("landing-page");
    const referenceNumber = document.getElementById("reference-number");
    const homeButton = document.getElementById("home-button");

    /**
     * Format Card Number
     * Listens for input events on the card number field, formats the card number
     * into groups of 4 digits, and displays the formatted card number on the card image.
     */
    cardNumberInput.addEventListener("input", () => {
        let formattedNumber = cardNumberInput.value.replace(/\D/g, "");
        formattedNumber = formattedNumber.substring(0, 16);
        cardNumberInput.value = formattedNumber.replace(/(\d{4})(?=\d)/g, "$1 ");

        cardNumberDisplay.forEach((span, i) => {
            span.textContent = formattedNumber[i] ? formattedNumber[i] : "_";
        });

        // Validate card number
        if (formattedNumber.length > 0 && !/^\d+$/.test(formattedNumber)) {
            showPopup("Please enter a valid card number (numbers only).");
            cardNumberInput.value = "";
        }
    });

    /**
     * Update Card Holder Name
     * Restricts input to letters and spaces and displays the name on the card.
     */
    cardHolderInput.addEventListener("input", () => {
        const name = cardHolderInput.value.trim();
        cardHolderNameDisplay.innerText = name.length < 1 ? "Your Name Here" : name.substring(0, 30).toUpperCase();

        if (!/^[a-zA-Z\s]*$/.test(name) && name.length > 0) {
            showPopup("Please enter a valid name (letters and spaces only).");
            cardHolderInput.value = "";
            cardHolderNameDisplay.innerText = "Your Name Here";
        }
    });

    /**
     * Format Expiry Date
     * Formats expiry date as MM/YY and validates if the date is in the future.
     */
    expiryDateInput.addEventListener("input", (e) => {
        let inputString = e.target.value.replace(/\D/g, "");
        let formattedString = "";
        
        if (inputString.length > 0) {
            formattedString = inputString.substring(0, 2);
            if (inputString.length > 2) {
                formattedString += "/" + inputString.substring(2, 4);
            }
        }
        
        e.target.value = formattedString;
        expiryDateDisplay.innerText = formattedString || "MM/YY";

        // Validate expiry date
        if (formattedString.length === 5) {
            const [month, year] = formattedString.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100;
            const currentMonth = currentDate.getMonth() + 1;
            const maxYear = currentYear + 3;

            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formattedString) || 
                parseInt(year) < currentYear || 
                parseInt(year) > maxYear || 
                (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                showPopup("Please enter a valid expiry date within the next three years (MM/YY format).");
                e.target.value = "";
                expiryDateDisplay.innerText = "MM/YY";
            }
        }
    });

    /**
     * Format and Display CVV
     * Limits CVV input to 3 numeric digits and displays it on the back of the card.
     */
    cvvInput.addEventListener("input", () => {
        cvvInput.value = cvvInput.value.replace(/\D/g, "").substring(0, 3);
        cvvDisplay.innerText = cvvInput.value.length === 3 ? cvvInput.value : "***";

        if (cvvInput.value.length !== 3) {
            cvvDisplay.innerText = "Invalid CVV";
        }
    });

    // Rotate card when CVV is focused
    cvvInput.addEventListener("focus", () => {
        cardElement.style.transform = "rotateY(180deg)";
    });

    // Rotate card back when CVV is blurred
    cvvInput.addEventListener("blur", () => {
        cardElement.style.transform = "rotateY(0deg)";
    });

    /**
     * Send OTP Functionality
     * Validates email format, simulates OTP sending, and displays feedback messages.
     */
    otpButton.addEventListener("click", () => {
        const email = emailInput.value;
        sendOtp(email)
            .then(message => showPopup(message))
            .catch(error => showPopup(error));
    });

    /**
     * Simulates sending an OTP to the provided email
     * @param {string} email - The email address to send the OTP to.
     * @returns {Promise} - Resolves if email is valid, rejects otherwise.
     */
    function sendOtp(email) {
        return new Promise((resolve, reject) => {
            if (!isValidEmail(email)) {
                reject("Please enter a valid email.");
            } else {
                setTimeout(() => {
                    resolve("OTP sent to your email.");
                }, 1000);
            }
        });
    }

    /**
     * Validates the email format
     * @param {string} email - The email address to validate.
     * @returns {boolean} - True if the email format is valid.
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Form Submission Handling
     * Validates CVV and OTP, then simulates form submission if valid.
     */
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const cvv = cvvInput.value;
        const otp = otpInput.value;

        // Validate CVV length
        if (cvv.length !== 3) {
            showPopup("CVV must be exactly 3 digits.");
            return;
        }

        // Validate OTP (this example assumes a static OTP for simplicity)
        if (otp !== "123456") {
            showPopup("Invalid OTP. Please try again.");
            return;
        }

        // Generate a reference number and display the success page
        const refNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
        referenceNumber.textContent = refNumber;

        // Hide form and show success message
        document.querySelector(".wrapper").style.display = "none";
        landingPage.style.display = "block";
    });

    /**
     * Return to Home Button
     * Resets the form and displays the form view again.
     */
    homeButton.addEventListener("click", () => {
        landingPage.style.display = "none";
        document.querySelector(".wrapper").style.display = "flex";
        resetForm();
    });

    /**
     * Reset Form Fields
     * Clears all input fields and resets card display to default values.
     */
    function resetForm() {
        cardNumberInput.value = "";
        cardHolderInput.value = "";
        expiryDateInput.value = "";
        cvvInput.value = "";
        emailInput.value = "";
        otpInput.value = "";

        cardHolderNameDisplay.innerText = "Your Name Here";
        expiryDateDisplay.innerText = "MM/YY";
        cvvDisplay.innerText = "***";

        cardNumberDisplay.forEach(span => span.textContent = "_");
    }

    /**
     * Show Popup Message
     * Creates and displays a popup message on the screen, which auto-disappears after 5 seconds.
     * @param {string} message - The message to display.
     */
    function showPopup(message) {
        const popup = document.createElement("div");
        popup.className = "popup";
        popup.innerHTML = `
            <p>${message}</p>
            <button onclick="removePopup(this.parentElement)">OK</button>
        `;
        document.body.appendChild(popup);

        setTimeout(() => removePopup(popup), 5000);
    }

    /**
     * Remove Popup
     * Removes the specified popup element from the DOM.
     * @param {HTMLElement} popup - The popup element to remove.
     */
    function removePopup(popup) {
        popup.remove();
    }

    // Initialize Form on Page Load
    resetForm();
});
