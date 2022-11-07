const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

app.get('/', (req, res) => {
  // render pug template for the index.html file

  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array

  let country_capital = [];
  let row = '';

  // fetch API data and render
  axios
    .get(url)
    .then(function (response) {
      // format API data to: Country - Capital
      response.data.forEach((country) => {
        row = `${country.name.official} - ${country.capital}`;
        country_capital.push(row);
      });

      // check if output array is empty
      if (country_capital.length !== 0) {
        // render pug template using sorted data
        res.render('page', {
          heading: 'Countries and Capitals',
          results: country_capital.sort(),
        });
      }
    })
    .catch(function (error) {
      country_capital.push('An error occurred. Please reload.');

      // render pug template
      res.render('page', {
        heading: 'Countries and Capitals',
        results: country_capital.sort(),
      });
    });
});

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population

  let larger_than_50m = [];
  let sort_by_pop = [];
  let sorted = [];
  let formatted = [];
  let row = [];
  let output = '';
  let population = '';

  // fetch API data and render
  axios
    .get(url)
    .then(function (response) {
      // filter API data. Population >= 50,000,000
      larger_than_50m = response.data.filter(
        (line) => line.population >= 50000000
      );

      // turn API data to array of arrays for processing
      larger_than_50m.forEach((country) => {
        row = [country.population, country.name.official];
        sort_by_pop.push(row);
      });

      // sort array of arrays by population
      sorted = sort_by_pop.sort((a, b) => b[0] - a[0]);

      // format and save as array of strings
      sorted.forEach((country) => {
        population = country[0].toLocaleString('en-US');
        output = `${country[1]} - ${population}`;
        formatted.push(output);
      });

      // check if output array is empty
      if (formatted.length !== 0) {
        // render pug template using sorted data
        res.render('page', {
          heading: 'Most Populous Countries',
          results: formatted,
        });
      }
    })
    .catch(function (error) {
      formatted.push('An error occurred. Please reload.');

      // render pug template with error message
      res.render('page', {
        heading: 'Most Populous Countries',
        results: formatted,
      });
    });
});

app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  let regions = [];
  let asia = 0;
  let europe = 0;
  let africa = 0;
  let oceania = 0;
  let antarctic = 0;
  let americas = 0;
  let row = '';

  // fetch API data and render
  axios
    .get(url)
    .then(function (response) {
      // process API data to count reigions
      response.data.forEach((country) => {
        if (country.region === 'Asia') {
          asia = asia + 1;
        } else if (country.region === 'Europe') {
          europe = europe + 1;
        } else if (country.region === 'Africa') {
          africa = africa + 1;
        } else if (country.region === 'Oceania') {
          oceania = oceania + 1;
        } else if (country.region === 'Antarctic') {
          antarctic = antarctic + 1;
        } else if (country.region === 'Americas') {
          americas = americas + 1;
        } else {
          console.log(`hmm...i'm missing ${country.region} region`);
        }
      });

      regions.push(`Asia - ${asia}`);
      regions.push(`Europe - ${europe}`);
      regions.push(`Africa - ${africa}`);
      regions.push(`Oceania - ${oceania}`);
      regions.push(`Antarctic - ${antarctic}`);
      regions.push(`Americas - ${americas}`);

      // check if output array is empty
      if (regions.length !== 0) {
        // render pug template
        res.render('page', {
          heading: 'Regions of the World',
          results: regions.sort(),
        });
      }
    })
    .catch(function (error) {
      regions.push('An error occurred. Please reload.');

      // render pug template
      res.render('page', {
        heading: 'Regions of the World',
        results: regions.sort(),
      });
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
