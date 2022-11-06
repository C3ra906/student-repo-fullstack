/** Exercise 04 - API **/

const url = 'https://restcountries.com/v3.1/all';

let app = document.querySelector('#results');

// Function to append a new list item of country name and population to DOM
const addCountryToDOM = (country) => {
  let element = document.createElement('li');
  let name = '';
  let population = '';

  name = country.name.official;
  population = country.population.toLocaleString('en-US');

  element.innerHTML = `${name} - ${population}`;

  app.append(element);
};

// Function to make GET request by fetch and loop through the response
const getData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((country) => {
        addCountryToDOM(country);
      });
    })
    .catch((error) => {
      // Handle error and display an error message for the user
      console.error(error);
      let element = document.createElement('div');
      element.innerHTML = 'An error occurred. Please reload.';
      app.append(element);
    });
};

getData(url);
