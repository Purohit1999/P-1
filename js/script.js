/* jshint esversion: 8 */


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

// Format and Display CVV
cvvInput.addEventListener("input", () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, "").substring(0, 3);
    cvvDisplay.innerText = cvvInput.value;
});

cvvInput.addEventListener("focus", () => {
    cardElement.style.transform = "rotateY(180deg)";
});

cvvInput.addEventListener("blur", () => {
    cardElement.style.transform = "rotateY(0deg)";
});

// Add this new event listener to handle clicks outside the CVV input
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
paymentForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const otp = document.getElementById("otp").value;
    
    try {
        const verificationMessage = await verifyOtp(otp);
        showPopup(verificationMessage);

        // Generate random reference number
        const refNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
        referenceNumber.textContent = refNumber;

        // Show landing page
        document.querySelector(".wrapper").style.display = "none";
        landingPage.style.display = "block";
    } catch (error) {
        showPopup(error); // Handle invalid OTP
    }
});


// Send OTP (Simulate API call with a Promise)
function sendOtp(email) {
    return new Promise((resolve, reject) => {
        if (!email) {
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
paymentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
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
homeButton.addEventListener("click", () => {
    landingPage.style.display = "none";
    document.querySelector(".wrapper").style.display = "flex";
    resetForm();
});

// Reset fields
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
function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerHTML = `
        <p>${message}</p>
        <button onclick="removePopup(this.parentElement)">OK</button>
    `;
    document.body.appendChild(popup);
}


// Remove popup
function removePopup(popup) {
    popup.remove();
}

// Reset fields on load
window.onload = resetForm;