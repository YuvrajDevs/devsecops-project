
const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello from the DevSecOps Pipeline! I am testing the deployment');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
