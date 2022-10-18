/** Exercise 04 - API **/

const url = 'https://restcountries.com/v3.1/all';

// Add your code here
let app = document.querySelector('#results');

const addCountryToDOM = (country) => {
  let element = document.createElement('li');
  let name = '';
  let population = '';
  name = country.name.official;
  population = country.population.toLocaleString('en-US');
  element.innerHTML = `${name} - ${population}`;
  app.append(element);
};

const getData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((country) => {
        addCountryToDOM(country);
      });
    })
    .catch((error) => {
      console.error(error);
      let element = document.createElement('div');
      element.textContent = 'An error occurred. Please reload.';
      app.append(element);
    });
};

getData(url);
