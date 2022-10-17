/** Exercise 03 - Form **/
// Add your code here
let form = document.querySelector('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  if (form.name.value.length > 0 && form.email.value.length > 0) {
    console.log('======== Form Submission ========');
    console.log('Name: ' + form.name.value);
    console.log('Email: ' + form.email.value);
    if (form.feedback.value.length > 0) {
      console.log('Feedback: ' + form.feedback.value);
    } else {
      console.log('No feedback was submitted.');
    }
    if (form.newsletter.checked === true) {
      console.log('Newsletter: Yes, I would like to join the newsleetter.');
    } else {
      console.log('No, thank you.');
    }
  }
  //event.preventDefault(); Should we be clearing the form after?
  else {
    //Empty name or email
    console.warn('You must enter your name and email to submit this form');
  }
}
