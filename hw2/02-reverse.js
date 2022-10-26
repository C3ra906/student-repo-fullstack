/** Exercise 02 - Reverse **/

let main = document.querySelector('main');
let number = document.getElementById('input');
let button = document.getElementById('reverse');
let new_element = document.createElement('div');
let result = document.createElement('p');
let input_array = [];
let counter = 0;

number.style.marginTop = '10px';

// Set result message to empty until Reverse button is pushed
result.innerHTML = '';
new_element.appendChild(result);
main.appendChild(new_element);

// Process user input for reversing
main.addEventListener('input', array);

// Function to store user input as an array of characters
function array(event) {
  if (number.value[counter] !== undefined) {
    // A number was inputted by the user and that number is added to the array
    input_array.push(number.value[counter]);
    counter += 1;
  } else {
    // Backspace was inputted by the user and previously entered number is removed from the array
    input_array.pop(number.value[counter - 1]);
    counter -= 1;
  }
}

// Handle button click event
button.addEventListener('click', reverse);

// Function to reverse the user inputted 8-digit number
function reverse(event) {
  if (counter !== 8) {
    // User input was not 8 digits long. Output result message
    result.innerHTML = 'Error: Please input an 8-digit number';
    result.style.color = 'red';
    result.style.margin = '10px';

    // Clear the user input and the result message
    number.addEventListener('click', clear);
  } else {
    let index = counter - 1;
    let reversed_num = '';

    // Copy right to left the user input array to an new array
    while (index !== -1) {
      reversed_num += `${input_array[index]}`;
      index -= 1;
    }

    // Output result message
    result.innerHTML = `${input.value} --> ${reversed_num}`;
    result.style.color = 'green';
    result.style.margin = '10px';

    // Clear the user input and the result message
    number.addEventListener('click', clear);
  }
}

// Function to clear the input and result message when the input area is clicked
function clear(event) {
  result.innerHTML = '';
  counter = 0;
  input_array = [];
  number.value = '';
}
