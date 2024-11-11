const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Route to display JSON data
app.get('/objects', (req, res) => {
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
