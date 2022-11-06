const express = require('express');
const app = express();
const port = process.env.PORT || 5001;

// Use middleware static() to serve all static files in the given folder
app.use(express.static('public'));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post('/submit', (req, res) => {
  res.status(200);
  res.type('html');
  res.write(`<p>Name: ` + req.body.Name + `<br>`);
  res.write(`Email: ` + req.body.Email + `<br>`);
  if (req.body.Comments) {
    res.write(`Comments: ` + req.body.Comments + `<br>`);
  } else {
    res.write(`Comments: n/a<br>`);
  }
  if (req.body.Newsletter === '') {
    res.write(`Newsletter: Yes, sign me up for the newsletter.</p>`);
  } else {
    res.write(`Newsletter: No, thank you.</p>`);
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
