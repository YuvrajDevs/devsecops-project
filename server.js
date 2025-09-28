
const GITHUB_TOKEN = "ghp_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6";

const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello from the DevSecOps Pipeline! I am testing the deployment');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
