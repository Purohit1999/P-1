# Credit Card Form :                             
![Image Alt](https://github.com/Purohit1999/P-2/blob/main/assets/responsive.png?raw=true)
Website Link :
[Website Link](https://purohit1999.github.io/P-2/)

Welcome to the Full Stack Developer Portfolio project! This repository contains the source code and documentation for a personal portfolio website showcasing the skills and services of a full stack developer. This README provides an overview of the project, including its features, technologies used, testing, deployment, and more.

## Table of Contents
1. [Project Overview](#project-overview)
2. [UX/UI Design](#uxui-design)
    - [Project Goals](#project-goals)
    - [User Goals](#user-goals)
    - [Parental Goals](#parental-goals)
    - [Developer and Business Goals](#developer-and-business-goals)
3. [Colour Scheme](#colour-scheme)
4. [Typography](#typography)
5. [User Stories](#user-stories)
6. [Imagery](#imagery)
7. [Wireframes](#wireframes)
8. [2D Skeleton Models](#2d-skeleton-models)
    - [Mobile View](#mobile-view)
    - [Tablet View](#tablet-view)
    - [Desktop View](#desktop-view)
9. [Design Choices](#design-choices)
    - [Mobiles](#mobiles)
    - [Tablets](#tablets)
    - [Desktops](#desktops)
10. [Features](#features)
    - [Features Left to Implement](#features-left-to-implement)
11. [Technologies Used](#technologies-used)
12. [Testing](#testing)
    - [W3C Markup Validator](#w3c-markup-validator)
    - [W3C CSS Validator](#w3c-css-validator)
    - [Testing User Stories from User Experience (UX) Section](#testing-user-stories-from-user-experience-ux-section)
    - [First Time Visitors Goals](#first-time-visitors-goals)
    - [Returning Visitor Goals](#returning-visitor-goals)
    - [Frequent User Goals](#frequent-user-goals)
    - [Lighthouse](#lighthouse)
    - [Manual Testing](#manual-testing)
    - [Solved Bugs](#solved-bugs)
    - [Unit Testing](#unit-testing)
    - [Further Testing](#further-testing)
13. [File Overview](#file-overview)
    - [index.html](#indexhtml)
    - [style.css](#stylecss)
14. [Deployment](#deployment)
    - [GitHub Pages](#github-pages)
    - [Forking the GitHub Repository](#forking-the-github-repository)
    - [Making a Local Clone](#making-a-local-clone)
15. [Credit](#credit)
16. [Content](#content)
17. [Media](#media)
18. [Acknowledgements](#acknowledgements)

## Project Overview
This project is a dynamic and interactive credit card form built with HTML, CSS, and JavaScript. The Credit Card Form is designed to provide users with a visually appealing and user-friendly interface for entering their credit card details. It features real-time updates on a card preview, interactive animations, input validation, and formatting to ensure a smooth and intuitive user experience.

Comments : Comments were added before each element and block in the HTML CSS and JavaScript files.

Required Attributes: The required attribute was added to all input fields in the form to ensure the user cannot submit the form without completing the required fields.

Landing Page: Added a landing page that displays a message after the form is submitted. It also generates and displays a random reference number using JavaScript. This page is initially hidden and shown upon form submission.

Responsive Layout: The layout scales better across different screen sizes, ensuring usability and aesthetics on various devices.


## UX/UI Design

### Project Goals

The main goal of this project is to create an intuitive and engaging web interface that effectively communicates the purpose and functionalities of the application. The design aims to enhance user experience by ensuring ease of navigation, accessibility, and visual appeal. By leveraging modern design principles, the project seeks to captivate users and encourage interaction with the content.

### User Goals

Users visiting this web page should be able to quickly understand its purpose and how to navigate through it. The design is intended to provide a seamless experience, allowing users to:

- Easily access relevant information.
- Interact with the web page in a straightforward manner.
- Enjoy a visually pleasing and cohesive design.

### Parental Goals

For parents who may assist their children in using the site, the design is focused on:

- Ensuring a safe and user-friendly environment.
- Making navigation simple and instructions clear.
- Providing an engaging and educational experience for younger users.

### Developer and Business Goals

From a developer and business perspective, the goals include:

- Creating a responsive and accessible design that works across various devices and screen sizes.
- Implementing a consistent and reusable design system to facilitate future updates and maintenance.
- Enhancing the brand's online presence through a modern and professional-looking interface.
- Meeting the business objectives by driving user engagement and satisfaction.

## Colour Scheme

- ### Primary Color 
  The primary color used throughout the site is a deep shade of blue, which conveys trust, professionalism, and stability. This color is prominently featured in headers, buttons, and other key elements.

- ### Secondary Color 
  The secondary color is a lighter shade of blue or teal, which complements the primary color. It is used for accents, hover states, and to highlight important information.

- ### Text Color 
  The primary text color is a dark gray, ensuring readability against the lighter background elements. This choice balances contrast and aesthetic appeal.

- ### Secondary Text Color 
  The secondary text color is a medium gray, used for less prominent text such as secondary information, descriptions, and captions.

- ### Border/Divider Color 
  The border and divider color is a light gray, providing subtle separation between different sections and content blocks without being too intrusive.

## Typography

The typography is clean and modern, using a sans-serif font family that enhances readability across all devices. The font hierarchy is well-defined, with larger, bold headers and subheaders guiding the user through the content, while the body text is kept at a comfortable reading size. This ensures a cohesive and consistent look throughout the web page.

## User Stories  

### 1. As a User, I want to enter my credit card information securely.
- **Description**: The user can input their credit card details (card number, cardholder name, expiration date, and CVV) in a form that is visually linked to a dynamic credit card display, providing a secure and user-friendly experience.
- **Acceptance Criteria**:
  - The user sees a visual representation of the card details as they type.
  - The form fields are clearly labeled and easy to understand.
  - Input validation ensures that all fields are correctly filled before submission.

### 2. As a User, I want to receive an OTP to verify my transaction.
- **Description**: After entering their credit card details, the user can request an OTP (One-Time Password) to be sent to their email, adding an extra layer of security to the transaction process.
- **Acceptance Criteria**:
  - The user can enter their email address to receive the OTP.
  - The user receives the OTP via email after clicking the "Send OTP" button.
  - The OTP field becomes visible, allowing the user to enter the code for verification.

### 3. As a User, I want to submit my payment details and complete the transaction.
- **Description**: The user can submit their payment information along with the OTP to finalize the transaction, after which they receive a confirmation with a reference number.
- **Acceptance Criteria**:
  - The user must input the OTP before submitting the payment.
  - Upon submission, the user sees a confirmation message indicating that the transaction was successful.
  - The user receives a unique reference number that they can save for future reference.

### 4. As a User, I want to be able to return to the home page after completing my transaction.
- **Description**: After completing a transaction, the user is presented with an option to return to the home page to start a new transaction or exit.
- **Acceptance Criteria**:
  - The user sees a "Return to Home" button on the transaction completion page.
  - Clicking the button takes the user back to the initial form, allowing them to initiate another payment if needed.

### 5. As a User, I want the webpage to be responsive and accessible on any device.
- **Description**: The user can access and use the payment form seamlessly across different devices, including mobile phones, tablets, and desktops.
- **Acceptance Criteria**:
  - The layout adjusts appropriately on different screen sizes without losing functionality or readability.
  - The buttons and input fields remain easily accessible and usable on touch devices.

   ![Image Alt]()   

## Imagery

Imagery plays a crucial role in the design, with a large, AI-generated hero image used as the background. This image is designed to be eye-catching and modern, setting the tone for the rest of the site. The energetic aesthetic helps to engage users from the moment they land on the page. For more details on the imagery used, you can explore the [Bing Image Creator](https://www.bing.com/images/create/).

## Wireframes

Wireframes were developed to outline the structure and layout of the web page before full design implementation. They serve as a blueprint, ensuring that all elements are properly aligned with the project’s goals and user needs. You can view the wireframes as part of the design documentation below:

- [Wireframes using diagrams.net](https://app.diagrams.net/)
- [Wireframes using Balsamiq](https://balsamiq.com/)



## 2D Skeleton Models

### Mobile View
|-----------------------|
|       Logo            |
|-----------------------|
|     Card Number       |
|-----------------------|
|       Name            |
|-----------------------|
|     Expiries          |
|-----------------------|
|     Payment info      |
|-----------------------|
|       Form            |
|-----------------------|
|        Submit         |
|-----------------------|

![Image Alt]()




### Tablet View
|------------------------------------------------|
|                    Logo                        |
|------------------------------------------------|
|                 Card Number                    |
|------------------------------------------------|
|                   Name                         |
|------------------------------------------------|
|                   Expires                      |
|------------------------------------------------|
|                 Payment info                   |
|------------------------------------------------|
|                    Form                        |
|------------------------------------------------|
|                    Submit                      |
|------------------------------------------------|

![Image Alt]()

### Desktop View
|----------------------------------------------------------------------------------|
|                                    Logo                                          |
|----------------------------------------------------------------------------------|
|                                Card Number                                       |
|----------------------------------------------------------------------------------|
|                                   Name                                           |
|----------------------------------------------------------------------------------|
|                                  Expires                                         |
|----------------------------------------------------------------------------------|
|                                Payment info                                      |
|----------------------------------------------------------------------------------|
|                                    Form                                          |
|----------------------------------------------------------------------------------|
|                                    Submit                                        |
|----------------------------------------------------------------------------------|

![Image Alt]()

## Design Choices  
Minimalist Layout: The design follows a minimalist approach, focusing on simplicity and ease of use. This choice helps users find information quickly without distractions.
Responsive Design: The layout adapts seamlessly across different screen sizes, ensuring a consistent user experience on mobile, tablet, and desktop devices.
Intuitive Navigation: A clean, user-friendly navigation bar makes it easy to access various sections of the website, enhancing overall usability.

### Mobiles
Adaptive Layout: The design collapses elements to fit smaller screens, providing a touch-friendly interface and ensuring that content is easily readable.
Simplified Navigation: A hamburger menu is used to keep the navigation compact and accessible, making it easier for users to browse through the site on mobile.

### Tablets
Optimized Grid System: The layout adjusts to utilize the larger screen space efficiently, displaying content in a grid format that is both visually appealing and functional.
Touch Interactivity: Elements like buttons and links are appropriately spaced to accommodate touch interactions, improving the user experience on tablets.

### Desktops
Full-Width Layout: The website uses the full width of the screen, offering a more immersive experience. The content is well-distributed across the screen, enhancing readability.
Enhanced Visuals: High-quality images and backgrounds are displayed in full resolution, making the site visually appealing on larger screens.

## Features
Random Reference Number Generation on Landing Page: A unique reference number is generated each time a user lands on the page, providing a personalized experience.
Return to Home Functionality: Users can easily return to the home page from any section of the website, enhancing navigation and user flow.
Interactive Cards: Service offerings are presented as interactive cards that flip on hover, providing additional details in an engaging way.
Smooth Scrolling: The site implements smooth scrolling for an enhanced navigation experience, ensuring that users can move between sections fluidly.
Responsive Design: The website is fully responsive, ensuring that it looks and functions well on all devices, from smartphones to desktops.
Contact Form: A fully functional contact form is included, allowing users to easily get in touch with the developer for inquiries or feedback.

### Features Left to Implement
User Authentication: Future versions will include user login functionality, allowing users to save their preferences and track interactions.
Advanced Analytics: Integration of detailed analytics to track user behavior and optimize content based on user interactions.
Multilingual Support: Adding support for multiple languages to cater to a global audience.

## Technologies Used
- HTML5: Structure and content of the website.
- CSS3: Styling and layout.
- Bootstrap: Responsive design framework.
- JavaScript: Interactive elements and functionality.
- Font Awesome: Icons.
- Google Fonts: Typography.

### Frameworks, Libraries & Programs Used
- Bootstrap 4.4.1: Used to assist with the responsiveness and styling of the website.
- Hover.css: Used on the Social Media icons in the footer to add the float transition while being hovered over.
- Google Fonts: Used to import the 'Titillium Web' font into the style.css file.
- Font Awesome: Used on all pages throughout the website to add icons for aesthetic and UX purposes.
- jQuery: Came with Bootstrap to make the navbar responsive but was also used for the smooth scroll function in JavaScript.
- Git: Used for version control by utilizing the Gitpod terminal to commit to Git and Push to GitHub.
- GitHub: Used to store the project's code after being pushed from Git.
- Photoshop: Used to create the logo, resizing images, and editing photos for the website.
- Balsamiq: Used to create the wireframes during the design process.

## Testing
The W3C Markup Validator and W3C CSS Validator Services were used to validate every page of the project to ensure there were no syntax errors.

### W3C Markup Validator :
Results : 
![Image Alt]()


### W3C CSS Validator :    
Results :
![Image Alt]()

### Testing User Stories from User Experience (UX) Section

### First Time Visitors Goals
Ensured that the landing page is welcoming and clearly explains the purpose of the site.
Verified that the navigation is intuitive, allowing first-time users to easily find what they need.  

### Returning Visitor Goals
Tested the smooth scrolling and interactive elements to ensure they encourage repeat visits.
Checked that users can quickly find updates or new content.

### Frequent User Goals
Ensured that frequent users can easily navigate to the sections they visit most often.
Tested the functionality of the random reference number generator to ensure it consistently works as intended.

### Lighthouse
Used Chrome Developer Tools Lighthouse to test site performance, best practices, and accessibility. 

![Image Alt]()


### Manual Testing
- **Navigation Links**: Ensured all links work correctly.
- **Responsive Design**: Tested on various devices and screen sizes.
- **Form Functionality**: Tested contact form submission.
![Image Alt]()

### Solved Bugs  
Flipping Card Not Working: Fixed an issue where the flipping card would not display the back content properly.
Custom Modal Opacity Issue: Resolved a bug where the custom modal was not appearing with the correct opacity, affecting visibility.
Accepting Number in Card Number: Corrected the input validation to ensure only numerical values are accepted in the card number field.
Expiry Date Not Accepting Less Than Current Year: Fixed the validation logic to ensure that the expiry date cannot be set to a year earlier than the current year.  

I wanted to bring to your attention an ongoing issue related to my GitHub account that is affecting the visibility of my P-1 project. Despite having made 20 commits (please find the enclosed screenshot), the page is still not accessible to tutors, mentors, or yourself. This is the same issue we encountered when I initially submitted the project.  

During a recent tutoring session with Sara, we discussed this problem, and she suggested that I work from a new GitHub profile. Consequently, I transitioned my work from my previous profile (param155) to a new one (Purohit1999). Unfortunately, this means that the commits made under my old profile are not reflected on my new one. Additionally, I primarily use VS Code for my development work due to the slow performance of Gitpod, which significantly impacts my efficiency.  

It appears that there might be a configuration issue with my student account on the Code Institute platform. My mentor also believes that this is the case, as the project remains inaccessible despite being public. I kindly request that you liaise with the appropriate team at Code Institute to resolve this matter, as I have invested a considerable amount of time in ensuring that my P-1-2 project is both attractive and responsive.   
![Image Alt]()      
- **Custom Modal Opacity Issue**: Fixed by adjusting CSS properties.
- **Footer Social Media Not Centered**: `justify-content: center;` applied.    
  ![Image Alt]()

### Unit Testing
JavaScript Functions: Ensured all custom scripts work as expected, particularly the random reference number generation and smooth scroll functions.

### Further Testing
- **Usability Testing**: Conduct tests to ensure ease of navigation, especially for first-time visitors.
- **Performance Testing**: Ensure the webpage loads quickly across all devices, particularly mobile.
- **A/B Testing**: Experiment with different call-to-action placements, button colors, and hero section layouts to maximize engagement.
- **Accessibility Testing**: Verify that the website meets accessibility standards (e.g., contrast ratios, alt texts, etc.).

  ![Image Alt]()
  ![Image Alt]()

## File Overview  

### index.html
This file contains the structure and content of the webpage. Key sections include:

- **Head Section**:
  - **Meta Tags**: Contains the viewport meta tag to ensure responsive design across devices.
  - **Title**: Sets the title of the webpage as "Credit Card Form".
  - **Google Fonts**: Links to the Roboto Mono font from Google Fonts.
  - **Stylesheet Link**: Links to the external stylesheet (`style.css`) that provides the webpage’s styling.
  - **External API Scripts**: Includes the Axios library for making HTTP requests.

- **Body Section**:
  - **Wrapper Div**: Acts as a container for all content, centering it on the page and providing a structured layout.
  - **Credit Card Display**:
    - **Card Front**: Displays the card branding (chip and Visa logo), the card number in four separate groups, the cardholder's name, and the expiration date.
    - **Card Back**: Shows the CVV field, a black magnetic strip, and the Visa logo.
  - **Payment Information Section**: Contains a form where users can enter their credit card details, including the card number, cardholder’s name, expiration date, CVV, and email for OTP.
  - **OTP Section**: Allows users to enter an OTP (One-Time Password) sent to their email.
  - **Buttons**: Provides a button to send the OTP and a button to submit the payment.
  - **Landing Page**: A hidden section that displays a confirmation message and reference number once the transaction is complete.
  
- **Script Section**:
  - **Script.js**: Links to the JavaScript file that handles the functionality of the form, such as form validation and interaction with the API for OTP.

### style.css
This file provides the styling for the webpage. Key styles include:

- **Global Styles**:
  - **Reset Styles**: Ensures consistent padding, margins, and box-sizing across all elements.
  - **Body Styles**: Sets a light blue background color, centers content, and adjusts padding for different screen sizes.
  
- **Wrapper Styles**: 
  - Defines the layout and appearance of the wrapper that contains the entire content, including background color, padding, border radius, and width constraints.

- **Credit Card Styles**:
  - **Card Container**: Styles the credit card element, including its size, 3D perspective, and transitions for flipping between the front and back.
  - **Card Front and Back**: Applies background gradients, positions elements like the chip, Visa logo, card number, and other details, and sets styles for text and logos.

- **Payment Form Styles**:
  - **Form Layout**: Styles form elements, including labels and input fields. Adjustments include font size, border styling, padding, and margin.
  - **Date and CVV Fields**: Styles the date and CVV fields, ensuring they are aligned and appropriately spaced.
  - **OTP Section**: Customizes the appearance of the OTP input and related buttons.

- **Landing Page Styles**:
  - **Layout and Typography**: Centers content, adjusts text size, and adds a shadow to create a card-like appearance for the confirmation message.
  - **Home Button**: Styles the button for returning to the home screen, including hover effects.

- **Button Styles**:
  - **Send OTP Button**: Green background with white text, including hover effects.
  - **Submit Payment Button**: Blue background with white text, also with hover effects.

- **Media Queries**:
  - **Responsive Design**: Adjusts the layout and font sizes based on the screen width, ensuring the webpage is usable on both small and large screens.  

## Deployment

### GitHub Pages
The project was deployed to GitHub Pages using the following steps:
1. Log in to GitHub and locate the GitHub Repository.
2. At the top of the Repository, locate the "Settings" Button on the menu.
3. Scroll down the Settings page until you locate the "GitHub Pages" Section.
4. Under "Source", click the dropdown called "None" and select "Master Branch".
5. The page will automatically refresh.
6. Scroll back down through the page to locate the now published site link in the "GitHub Pages" section.

### Forking the GitHub Repository
Forking the GitHub Repository allows you to make a copy of the original repository on your GitHub account. Steps to fork the repository:
1. Log in to GitHub and locate the GitHub Repository.
2. At the top of the Repository, locate the "Fork" Button.
3. You should now have a copy of the original repository in your GitHub account.

### Making a Local Clone
1. Log in to GitHub and locate the GitHub Repository.
2. Under the repository name, click "Clone or download".
3. Copy the link under "Clone with HTTPS".
4. Open Git Bash.
5. Change the current working directory to the location where you want the cloned directory.
6. Type `git clone`, and then paste the URL you copied in Step 3.
7. Press Enter. Your local clone will be created.

## GitPod and GitHub Deployment Issues Resolved  
Over the past three days, I have been diligently working on my first project, which is now complete and functioning perfectly in Visual Studio. However, when attempting to share my project with the online tutors for review, they are unable to access my GitHub profile. This issue is severely hampering my progress as I am unable to receive the necessary feedback and move forward to the JavaScript lessons.

Despite multiple attempts to resolve this issue, including extensive troubleshooting on SLACK and seeking help from the online tutors, the problem remains unresolved. I am now reaching out to you as my last resort, hoping for a swift resolution.

The main issues I am encountering are as follows:

**GitHub Profile Visibility**: My online tutors are unable to view my GitHub profile and the project repository, which is essential for them to review my work.

**GitPod Accessibility**: There seem to be issues with GitPod that are preventing my project from being accessed and reviewed online.

Given that I have already invested a considerable amount of time and effort into resolving these issues without success, I kindly request your immediate assistance in addressing and resolving these problems. It is crucial for me to submit my project promptly and continue with the coursework as scheduled.

Please let me know if you require any additional information or access details to diagnose and fix the issues. Your prompt attention to this matter would be greatly appreciated.


## Credit
- The full-screen hero image code came from a StackOverflow post.
- **Bootstrap 4**: Used throughout the project to make the site responsive using the Bootstrap Grid System.
- **MDN Web Docs**: For Pattern Validation code. Code was modified to fit a UK phone number layout.

### Media
- All Images were created by the developer using Bing's free AI tool.
- Free Images source:
  - [Bing Image](https://www.bing.com/images/create/)

### Free Fonts source
- [Roboto](https://fonts.google.com/specimen/Roboto)
- [Font Awesome](https://fontawesome.com/kits)

### Code
- **Bootstrap** components and **Font Awesome** icons.
  - [Get Bootstrap](https://getbootstrap.com/)
  - [Google Fonts - Roboto](https://fonts.google.com/specimen/Roboto)

## Content
All content was written by the developer. Psychological properties of colors text in the README.md was found on the Colour Affects website.


## Acknowledgements
- My Mentor for continuous helpful feedback.
- Tutor support at Code Institute for their support.
- EKC college teacher Rachel Furlong's help and support.
