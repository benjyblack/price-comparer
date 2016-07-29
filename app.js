const express = require('express');
const app = express();
const boot = require('./app/util/boot');

const apiRouter = express.Router();

const auth = require('./app/controllers/auth');

app.use(express.static('public'));

apiRouter.get('/', (req, res) => res.send('Hello World!'));

apiRouter.use('/auth', require('./app/controllers/auth'));
apiRouter.use('/products', require('./app/controllers/products'));

app.use('/api/v1', apiRouter);

boot().then(() => {
  app.listen(3000, () => console.log('Shopify app listening on port 3000!'));
});