// Import necessary dependencies for testing
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Read the HTML file
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

// Set up JSDOM
let dom;
let container;

describe('Credit Card Form', () => {
  beforeEach(() => {
    // Set up a new JSDOM instance before each test
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
    global.document = dom.window.document;
    global.window = dom.window;
  });

  // Test for form elements presence
  describe('Form Elements', () => {
    it('should have all required form fields', () => {
      expect(container.querySelector('#card-number')).toBeTruthy();
      expect(container.querySelector('#card-holder')).toBeTruthy();
      expect(container.querySelector('#expiry-date')).toBeTruthy();
      expect(container.querySelector('#cvv')).toBeTruthy();
      expect(container.querySelector('#email-otp')).toBeTruthy();
      expect(container.querySelector('#otp')).toBeTruthy();
    });

    it('should have Send OTP and Submit Payment buttons', () => {
      expect(container.querySelector('#send-otp')).toBeTruthy();
      expect(container.querySelector('button[type="submit"]')).toBeTruthy();
    });
  });

  // Test card number input functionality
  describe('Card Number Input', () => {
    it('should format card number correctly', () => {
      const cardNumberInput = container.querySelector('#card-number');
      cardNumberInput.value = '1234567890123456';
      cardNumberInput.dispatchEvent(new dom.window.Event('input'));
      expect(cardNumberInput.value).toBe('1234 5678 9012 3456');
    });

    it('should not allow non-numeric input', () => {
      const cardNumberInput = container.querySelector('#card-number');
      cardNumberInput.value = '1234abcd5678';
      cardNumberInput.dispatchEvent(new dom.window.Event('input'));
      expect(cardNumberInput.value).toBe('1234 5678');
    });
  });

  // Test card holder name input functionality
  describe('Card Holder Name Input', () => {
    it('should update card holder name display', () => {
      const cardHolderInput = container.querySelector('#card-holder');
      const cardHolderNameDisplay = container.querySelector('#card-holder-name');
      cardHolderInput.value = 'John Doe';
      cardHolderInput.dispatchEvent(new dom.window.Event('input'));
      expect(cardHolderNameDisplay.textContent).toBe('JOHN DOE');
    });

    it('should not allow numbers in card holder name', () => {
      const cardHolderInput = container.querySelector('#card-holder');
      cardHolderInput.value = 'John123 Doe';
      cardHolderInput.dispatchEvent(new dom.window.Event('input'));
      expect(cardHolderInput.value).toBe('');
    });
  });

  // Test expiry date input functionality
  describe('Expiry Date Input', () => {
    it('should format expiry date correctly', () => {
      const expiryDateInput = container.querySelector('#expiry-date');
      expiryDateInput.value = '1223';
      expiryDateInput.dispatchEvent(new dom.window.Event('input'));
      expect(expiryDateInput.value).toBe('12/23');
    });

    it('should not allow invalid month', () => {
      const expiryDateInput = container.querySelector('#expiry-date');
      expiryDateInput.value = '13/23';
      expiryDateInput.dispatchEvent(new dom.window.Event('input'));
      expect(expiryDateInput.value).toBe('');
    });
  });

  // Test CVV input functionality
  describe('CVV Input', () => {
    it('should allow only numeric input', () => {
      const cvvInput = container.querySelector('#cvv');
      cvvInput.value = '12a';
      cvvInput.dispatchEvent(new dom.window.Event('input'));
      expect(cvvInput.value).toBe('12');
    });

    it('should limit CVV to 3 digits', () => {
      const cvvInput = container.querySelector('#cvv');
      cvvInput.value = '1234';
      cvvInput.dispatchEvent(new dom.window.Event('input'));
      expect(cvvInput.value).toBe('123');
    });
  });

  // Test OTP functionality
  describe('OTP Functionality', () => {
    it('should send OTP when button is clicked', () => {
      const sendOtpButton = container.querySelector('#send-otp');
      const emailInput = container.querySelector('#email-otp');
      emailInput.value = 'test@example.com';
      
      // Mock the showPopup function
      global.showPopup = jest.fn();
      
      sendOtpButton.click();
      expect(global.showPopup).toHaveBeenCalledWith('OTP sent to your email.');
    });

    it('should show error when email is not provided', () => {
      const sendOtpButton = container.querySelector('#send-otp');
      
      // Mock the showPopup function
      global.showPopup = jest.fn();
      
      sendOtpButton.click();
      expect(global.showPopup).toHaveBeenCalledWith('Please enter a valid email.');
    });
  });

  // Test form submission
  describe('Form Submission', () => {
    it('should prevent submission with invalid OTP', () => {
      const form = container.querySelector('#payment-form');
      const otpInput = container.querySelector('#otp');
      otpInput.value = '123457'; // Incorrect OTP
      
      // Mock the showPopup function
      global.showPopup = jest.fn();
      
      form.dispatchEvent(new dom.window.Event('submit'));
      expect(global.showPopup).toHaveBeenCalledWith('Invalid OTP. Please try again.');
    });

    it('should allow submission with valid OTP', () => {
      const form = container.querySelector('#payment-form');
      const otpInput = container.querySelector('#otp');
      otpInput.value = '123456'; // Correct OTP
      
      // Mock necessary functions and elements
      global.showPopup = jest.fn();
      container.querySelector('.wrapper').style.display = 'block';
      container.querySelector('#landing-page').style.display = 'none';
      
      form.dispatchEvent(new dom.window.Event('submit'));
      expect(container.querySelector('.wrapper').style.display).toBe('none');
      expect(container.querySelector('#landing-page').style.display).toBe('block');
    });
  });

  // Test error handling
  describe('Error Handling', () => {
    it('should show popup for invalid input', () => {
      // Mock the showPopup function
      global.showPopup = jest.fn();
      
      // Trigger invalid card number input
      const cardNumberInput = container.querySelector('#card-number');
      cardNumberInput.value = '1234abcd';
      cardNumberInput.dispatchEvent(new dom.window.Event('input'));
      
      expect(global.showPopup).toHaveBeenCalledWith('Please enter a valid card number (numbers only).');
    });
  });
});
