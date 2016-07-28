const ngrok = require('ngrok');
const express = require('express');
const app = express();

// Start actual app HTTP server
require('./app');

ngrok.connect(3000, function (err, url) {
  console.log(`Redirecting request to ${url}`);
  app.get('/', (req, res) => res.redirect(301, url));
  app.listen(3001, () => console.log('Secure redirect listening on 3001'));
});