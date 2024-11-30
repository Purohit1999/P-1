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

document.addEventListener("DOMContentLoaded", function () {
    /**
     * Element References
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
     * Formats the card number into groups of 4 digits and validates the input.
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
     * Restricts input to letters and spaces and updates the card display.
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
     * Formats expiry date as MM/YY and validates if the date is within the next three years.
     */
    expiryDateInput.addEventListener("input", (e) => {
        // Remove non-digit characters and prepare for formatting
        let inputString = e.target.value.replace(/\D/g, "");
        let formattedString = "";

        // Format as MM/YY
        if (inputString.length > 0) {
            formattedString = inputString.substring(0, 2); // Extract MM
            if (inputString.length > 2) {
                formattedString += "/" + inputString.substring(2, 4); // Add /YY
            }
        }

        e.target.value = formattedString; // Update input value with formatted string
        expiryDateDisplay.innerText = formattedString || "MM/YY"; // Update display

        // Validate expiry date if input is complete
        if (formattedString.length === 5) {
            const [month, year] = formattedString.split('/');
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear() % 100; // Last two digits of current year
            const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
            const maxYear = currentYear + 3; // Three years into the future

            // Validation checks
            if (
                !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formattedString) || // Ensure format is MM/YY
                parseInt(year) < currentYear || // Ensure year is not in the past
                parseInt(year) > maxYear || // Ensure year is within the 3-year limit
                (parseInt(year) === currentYear && parseInt(month) < currentMonth) // Ensure current month's validity
            ) {
                // Show error and reset invalid input
                showPopup("Please enter a valid expiry date within the next three years (MM/YY format).");
                e.target.value = "";
                expiryDateDisplay.innerText = "MM/YY";
            }
        }
    });

    /**
     * Format and Display CVV
     * Limits CVV input to 3 numeric digits and updates the card display.
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
     * Simulates OTP sending and validates email format.
     */
    otpButton.addEventListener("click", () => {
        const email = emailInput.value;
        sendOtp(email)
            .then(message => showPopup(message))
            .catch(error => showPopup(error));
    });

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

        if (cvv.length !== 3) {
            showPopup("CVV must be exactly 3 digits.");
            return;
        }

        if (otp !== "123456") {
            showPopup("Invalid OTP. Please try again.");
            return;
        }

        const refNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
        referenceNumber.textContent = refNumber;

        document.querySelector(".wrapper").style.display = "none";
        landingPage.style.display = "block";
    });

    homeButton.addEventListener("click", () => {
        landingPage.style.display = "none";
        document.querySelector(".wrapper").style.display = "flex";
        resetForm();
    });

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

    function removePopup(popup) {
        popup.remove();
    }

    // Initialize form
    resetForm();
});
