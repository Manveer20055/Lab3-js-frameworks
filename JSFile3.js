const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

// Read (GET) all objects
app.get('/objects', (req, res) => {
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.send(JSON.parse(data));
  });
});

// Create (POST) a new object
app.post('/objects', (req, res) => {
  const newObject = req.body;
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const objects = JSON.parse(data);
    objects.push(newObject);
    fs.writeFile('./data/data.json', JSON.stringify(objects), err => {
      if (err) throw err;
      res.status(201).send(newObject);
    });
  });
});

// Update (PUT) an existing object by ID
app.put('/objects/:id', (req, res) => {
  const objectId = parseInt(req.params.id);
  const updatedData = req.body;
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) throw err;
    let objects = JSON.parse(data);
    objects = objects.map(obj => obj.id === objectId ? { ...obj, ...updatedData } : obj);
    fs.writeFile('./data/data.json', JSON.stringify(objects), err => {
      if (err) throw err;
      res.send(updatedData);
    });
  });
});

// Delete (DELETE) an object by ID
app.delete('/objects/:id', (req, res) => {
  const objectId = parseInt(req.params.id);
  fs.readFile('./data/data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const objects = JSON.parse(data).filter(obj => obj.id !== objectId);
    fs.writeFile('./data/data.json', JSON.stringify(objects), err => {
      if (err) throw err;
      res.status(204).send();
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
