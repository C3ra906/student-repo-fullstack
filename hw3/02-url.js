const { linkSync } = require('fs');
const http = require('http');
const { runInNewContext, runInThisContext } = require('vm');
const port = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  const routes = [
    '/attributes?hello=world&lorem=ipsum',
    '/items?first=1&second=2&third=3&fourth=4',
    '/characters?spongebob=squarepants&patrick=star&sandy=cheeks',
  ];

  // use the URL interface to work with URLs
  // source: https://developer.mozilla.org/en-US/docs/Web/API/URL
  let url = new URL(req.url, `http://${req.headers.host}`);

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/') {
    let routeResults = getRoutes();

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 02</h1>`);

    res.write(`<ul> ${routeResults} </ul>`);
  }

  // new route --> /attributes?hello=world&lorem=ipsum
  else if (req.url === '/attributes?hello=world&lorem=ipsum') {
    let params = url.searchParams;
    let list = [];
    let content = `<table border="1">`;

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    // creates Row objects to store queries and values
    function Row(query, value) {
      this.query = query;
      this.value = value;
    }

    // parse url to create a new Row object for each query-value pair and add to list array
    params.forEach((second, first) => {
      let add = new Row(first, second);
      list.push(add);
    });

    // Create table rows
    list.forEach((row) => {
      let col1 = row.query;
      let col2 = row.value;
      content = content + `<tr><td>${col1}</td><td>${col2}</td></tr>`;
    });

    content = content + `</table>`;
    res.write(content);
    res.end();
  }

  // new route --> /items?first=1&second=2&third=3&fourth=4
  else if (req.url === '/items?first=1&second=2&third=3&fourth=4') {
    let params = url.searchParams;
    let list = [];
    let content = `<table border="1">`;

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    // creates Row objects to store queries and values
    function Row(query, value) {
      this.query = query;
      this.value = value;
    }

    // parse url to create a new Row object for each query-value pair and add to list array
    params.forEach((second, first) => {
      let add = new Row(first, second);
      list.push(add);
    });

    // Create table rows
    list.forEach((row) => {
      let col1 = row.query;
      let col2 = row.value;
      content = content + `<tr><td>${col1}</td><td>${col2}</td></tr>`;
    });

    content = content + `</table>`;
    res.write(content);
    res.end();
  }

  // new route --> /characters?spongebob=squarepants&patrick=star&sandy=cheeks
  else if (
    req.url === '/characters?spongebob=squarepants&patrick=star&sandy=cheeks'
  ) {
    let params = url.searchParams;
    let list = [];
    let content = `<table border="1">`;

    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    // creates Row objects to store queries and values
    function Row(query, value) {
      this.query = query;
      this.value = value;
    }

    // parse url to create a new Row object for each query-value pair and add to list array
    params.forEach((second, first) => {
      let add = new Row(first, second);
      list.push(add);
    });

    // Create table rows
    list.forEach((row) => {
      let col1 = row.query;
      let col2 = row.value;
      content = content + `<tr><td>${col1}</td><td>${col2}</td></tr>`;
    });

    content = content + `</table>`;
    res.write(content);
    res.end();
  }

  // new route --> all other routes invoke 404
  else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    });
    res.write(`<h1>404 - page not found :( </h1>`);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
