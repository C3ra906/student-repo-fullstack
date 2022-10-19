/** Exercise 03 - Form **/

let form = document.querySelector('form');

form.addEventListener('submit', handleSubmit);

// Function that outputs form data in the console
function handleSubmit(event) {
  // Check whether Name and Email fields are empty
  if (form.name.value.length > 0 && form.email.value.length > 0) {
    // Check if the email address includes at least @
    if (form.email.value.includes('@')) {
      console.log('======== Form Submission ========');
      console.log('Name: ' + form.name.value);
      console.log('Email: ' + form.email.value);

      // Check whether the message field is empty and output console message
      if (form.feedback.value.length > 0) {
        console.log('Feedback: ' + form.feedback.value);
      } else {
        console.log('No feedback was submitted.');
      }

      // Check whether the newsletter checkbox is checked and output console message
      if (form.newsletter.checked === true) {
        console.log('Newsletter: Yes, I would like to join the newsletter.');
      } else {
        console.log('No, thank you.');
      }
    } else {
      // Email was missing at least @
      console.warn(
        'Your email address is missing @. Please check your email address is correct'
      );
    }
  } else {
    // Empty Name or Email
    console.warn('You must enter your name and email to submit this form');
  }
}
