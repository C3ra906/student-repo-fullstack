const http = require('http');
const port = process.env.PORT || 5001;

// http://localhost:5001/form should return a form with input elements for username, email, and submit button
// http://localhost:5001/submit should return all the data the user entered

// basic form in HTML
const form = `<html><head><title>Submission Form</title></head><body>
  <form method='post' action='/submit'>
  <label for="name">Name: </label> 
  <input type="text" name="Name" id="name" /><br />
  <label for="email">Email: </label>
  <input type="text" name="Email" id="email" /><br />
  <label for="comments">comments: </label><br />
  <textarea name="Comments" id="comments"></textarea><br />
  <input type="checkbox" name="Newsletter" id="newsletter"/>
  <label for="Newsletter">Sign up for the newsletter</label><br />
  <input type="submit" name="submit" value="Submit"/><br />
  </form></body></html>`;

const server = http.createServer((req, res) => {
  // main route. Just redirects to form
  if (req.url === '/') {
    res.writeHead(302, { Location: '/form' });
    res.end();
  }

  // new route --> form
  else if (req.url === '/form') {
    //form submitted
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });
    res.write(form);
    res.end();
  }

  // new route --> submit
  else if (req.url === '/submit') {
    let info = '<p>';
    let original_url = new URL(req.url, `http://${req.headers.host}`);
    let new_url = '';
    let news = '';
    // Handles data
    req.on('data', (chunk) => {
      /* check whether Newsletter value is present
       Then, Append data to the end of current url to use URL() for parsing */
      news = chunk.toString();
      if (news.search('Newsletter') === -1) {
        new_url = original_url.href + `query?` + chunk + '&Newsletter=off';
      } else {
        new_url = original_url.href + `query?` + chunk;
      }
      let url = new URL(new_url, `http://${req.headers.host}`);
      let params = url.searchParams;
      let list = [];
      console.log('data: ' + chunk);

      // creates Row objects to store queries and values
      function Row(query, value) {
        this.query = query;
        this.value = value;
      }

      // parse url to create a new Row object for each query-value pair and add to list array
      params.forEach((second, first) => {
        // checks whether checkbox is checked
        if (first === 'Newsletter' && second === 'on') {
          let add = new Row(first, 'Yes, sign me up for the newsletter.');
          list.push(add);
        }
        // checks whether checkbox is unchecked
        else if (first === 'Newsletter' && second === 'off') {
          let add = new Row(first, 'No, thank you.');
          list.push(add);
        }
        // checks whether there are inputs
        else if (second !== '') {
          let add = new Row(first, second);
          list.push(add);
        }
        // an input left empty
        else {
          let add = new Row(first, 'n/a');
          list.push(add);
        }
      });

      // Create rows
      list.forEach((row) => {
        if (row.query !== 'submit') {
          let col1 = row.query;
          let col2 = row.value;
          info = info + `${col1}: ${col2}<br>`;
        }
      });
      info = info + `</p>`;
    });

    // Displays form info gathered
    req.on('end', () => {
      res.writeHead(200, {
        'Content-Type': 'text/html',
      });
      res.write(info);
      res.end();
    });
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
