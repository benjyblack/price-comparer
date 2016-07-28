const express = require('express');
const app = express();

const auth = require('./app/controllers/auth');

app.use(express.static('public'));

app.get('/api/auth', auth.root);
app.get('/api/auth/callback', auth.callback);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(3000, () => console.log('Shopify app listening on port 3000!'));