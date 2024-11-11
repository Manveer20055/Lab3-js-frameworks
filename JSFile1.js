const express = require('express');
const app = express();
const port = 3000;

// Route to display group names
app.get('/', (req, res) => {
  res.send('<h1>Group Names</h1><p>Member 1, Member 2, Member 3</p>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
