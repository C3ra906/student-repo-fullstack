const http = require('http');
const fs = require('fs');
const { Readable } = require('stream');
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
// form
const form = `<html><head><title>Submission Form</title></head><body>
  <form method='post' action="/submit">
  <label for="name">Name: </label> 
  <input type="text" name="name" id="name" /><br />
  <label for="email">Email: </label>
  <input type="text" name="email" id="email" /><br />
  <label for="comments">Comments: </label><br />
  <textarea name="comments" id="comments"></textarea><br />
  <input type="checkbox" value="" id="newsletter"/>
  <label for="newsletter">Sign up for the newsletter</label><br />
  <input type="submit" name="submit" value="Submit"/><br />
  </form></body></html>`;

const server = http.createServer((req, res) => {
  //let info = '';

  // new route --> form
  if (req.url === '/form') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(form);
    req.on('data', (chunk) => {
      const writeable = fs.createWriteStream('form.txt');
    });
    req.on('end', () => {
      //res.write(info);
      res.end();
    });
  }

  // new route --> submit
  else if (req.url === '/submit') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write('You submitted the form');
    res.end();
  }

  // other routes --> invoke error page
  else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.write(`<h1>404 - page not found :( </h1>`);
    res.end();
  }
});

// http://localhost:5001/submit should return all the data the user entered

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
