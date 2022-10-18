/** Exercise 02 - Reverse **/

// Add your code here
let main = document.querySelector('main');

let number = document.getElementById('input');
let button = document.getElementById('reverse');
let new_element = document.createElement('div');
let result = document.createElement('p');
let input_array = [];
let counter = 0;

result.innerHTML = '';
new_element.appendChild(result);
main.appendChild(new_element);

main.addEventListener('input', array);

function array(event) {
  if (number.value[counter] !== undefined) {
    //a number was inputted
    input_array.push(number.value[counter]);
    counter += 1;
  } else {
    //backspace inputted
    input_array.pop(number.value[counter - 1]);
    counter -= 1;
  }
}

button.addEventListener('click', reverse);

function reverse(event) {
  if (counter !== 8) {
    result.innerHTML = 'Error: Please input an 8-digit number';
    result.style.color = 'red';
    result.style.margin = '10px';
    number.addEventListener('click', clear);
  } else {
    let index = counter - 1;
    let reversed_num = '';
    while (index !== -1) {
      reversed_num += `${input_array[index]}`;
      index -= 1;
    }
    result.innerHTML = `${input.value} --> ${reversed_num}`;
    result.style.color = 'green';
    result.style.margin = '10px';
    number.addEventListener('click', clear);
  }
}

function clear(event) {
  result.innerHTML = '';
  counter = 0;
  input_array = [];
  number.value = '';
}
