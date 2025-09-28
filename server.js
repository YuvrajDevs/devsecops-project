
const FAKE_API_KEY = "AKIAIOSFODNN7EXAMPLE";

const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello from the DevSecOps Pipeline!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
