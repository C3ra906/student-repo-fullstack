const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || 5001;

// Use the express-session module
app.use(
  session({
    store: new session.MemoryStore(),
    secret: 'my cat is super cute',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
    },
  })
);

// main route
app.get('/', (req, res) => {
  res.status(200);
  res.type('txt');

  // first domain visit
  if (req.session.routes === undefined) {
    req.session.routes = [];
    res.write(`currently on route: ` + req.route.path + '\n' + '\n');
    res.write(`Welcome to http://localhost:${port}`);
  }

  // non-first domain visit
  else {
    res.write(`currently on route: ` + req.route.path + '\n' + '\n');
    res.write(`Previously visited: ` + '\n');
    req.session.routes.forEach((route) => {
      res.write(route + '\n');
    });
  }

  // store route
  req.session.routes.push(req.route.path);

  res.end();
});

// all other routes
app.get('/:parameter', (req, res) => {
  res.status(200);
  res.type('txt');

  // first domain visit
  if (req.session.routes === undefined) {
    req.session.routes = [];
    res.write(`currently on route: /` + req.params.parameter + '\n' + '\n');
    res.write(`Welcome to http://localhost:${port}`);
  }

  // non-first domain visit
  else {
    res.write(`currently on route: /` + req.params.parameter + '\n' + '\n');
    res.write(`Previously visited: ` + '\n');
    req.session.routes.forEach((route) => {
      if (route !== '/') {
        res.write(`/` + route + '\n');
      } else {
        res.write(route + '\n');
      }
    });
  }

  // store route if it's not /favicon.ico route
  if (req.params.parameter !== 'favicon.ico') {
    req.session.routes.push(req.params.parameter);
  }

  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
