/* jshint esversion: 8 */
/**
 * Credit Card Payment Form Script
 *
 * This script handles real-time formatting, validation, and submission of a credit card payment form.
 * Key Features:
 * - Card number formatting and validation.
 * - Cardholder name validation.
 * - Expiry date selection and validation (via calendar).
 * - CVV validation.
 * - OTP handling and form submission.
 */

document.addEventListener("DOMContentLoaded", function () {
    /**
     * Element References
     */
    const cardNumberInput = document.getElementById("card-number");
    const cardHolderInput = document.getElementById("card-holder");
    const expiryDateInput = document.getElementById("expiry-date");
    const expiryDateDisplay = document.getElementById("validity");
    const cvvInput = document.getElementById("cvv");
    const emailInput = document.getElementById("email-otp");
    const otpInput = document.getElementById("otp");
    const cardHolderNameDisplay = document.getElementById("card-holder-name");
    const cardNumberDisplay = document.querySelectorAll(".card-number-display");
    const cvvDisplay = document.getElementById("cvv-display");
    const cardElement = document.getElementById("card");
    const otpButton = document.getElementById("send-otp");
    const paymentForm = document.getElementById("payment-form");
    const landingPage = document.getElementById("landing-page");
    const referenceNumber = document.getElementById("reference-number");
    const homeButton = document.getElementById("home-button");

    /**
     * Initialize Flatpickr for Expiry Date Input
     * This provides a calendar picker with restrictions on valid dates.
     */
    flatpickr(expiryDateInput, {
        dateFormat: "m/y", // Month and year format
        minDate: "today", // Allow selection only from the current month onwards
        maxDate: new Date().setFullYear(new Date().getFullYear() + 3), // Limit selection to 3 years into the future
        onClose(selectedDates, dateStr) {
            expiryDateDisplay.innerText = dateStr || "MM/YY"; // Update display with selected date
        }
    });

    /**
     * Format Card Number
     * Formats the card number into groups of 4 digits and validates the input.
     */
    cardNumberInput.addEventListener("input", () => {
        let formattedNumber = cardNumberInput.value.replace(/\D/g, ""); // Remove non-digit characters
        formattedNumber = formattedNumber.substring(0, 16); // Limit to 16 digits
        cardNumberInput.value = formattedNumber.replace(/(\d{4})(?=\d)/g, "$1 "); // Group by 4 digits

        // Update display
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
     * Format and Display CVV
     * Limits CVV input to 3 numeric digits and updates the card display.
     */
    cvvInput.addEventListener("input", () => {
        cvvInput.value = cvvInput.value.replace(/\D/g, "").substring(0, 3); // Limit to 3 digits
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
            .then((message) => showPopup(message))
            .catch((error) => showPopup(error));
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

    // Return to the home page and reset the form
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

        cardNumberDisplay.forEach((span) => (span.textContent = "_"));
    }

    /**
     * Show Popup
     * Displays a temporary popup message for user feedback.
     */
    function showPopup(message) {
        const popup = document.createElement("div");
        popup.className = "popup";
        popup.innerHTML = `
            <p>${message}</p>
            <button onclick="removePopup(this.parentElement)">OK</button>
        `;
        document.body.appendChild(popup);

        setTimeout(() => removePopup(popup), 5000); // Auto-remove after 5 seconds
    }

    /**
     * Remove Popup
     * Removes the popup element from the DOM.
     */
    function removePopup(popup) {
        popup.remove();
    }

    // Initialize form
    resetForm();
});
