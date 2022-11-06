const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// http://localhost:5000/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5000/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5000/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5000/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5000/other, this exercise should return a status code 404 with '404 - page not found' in html format

const routes = [
  'welcome',
  'redirect',
  'redirected',
  'cache',
  'cookie',
  'other',
];

let getRoutes = () => {
  let result = '';

  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );

  return result;
};

app.get('/', (req, res) => {
  let routeResults = getRoutes();

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<h1>Exercise 04</h1>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

// welcome route, get method
app.get('/welcome', (req, res) => {
  res.status(200);
  res.type('html');
  res.send('<h1>Welcome</h1><p>Welcome to the welcome page :) </p>');
});

// redirect route, get method
app.get('/redirect', (req, res) => {
  res.redirect(302, '/redirected');
});

// redirected route, get method
app.get('/redirected', (req, res) => {
  res.status(200);
  res.type('html');
  res.send('<h1>Redirected</h1><p>You have been redirected</p>');
});

// cache route, get method
app.get('/cache', (req, res) => {
  res.status(200);
  res.type('html');
  res.send('<h1>Cookie</h1><p>You have been redirected</p>');
});

// cookie route, get method
app.get('/cookie', (req, res) => {
  res.status(200);
  res.type('txt');
});

// all other route returns 404
app.use((err, req, res, next) => {
  res.status(404);
  res.type('html');
  res.send('404 - page not found');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
