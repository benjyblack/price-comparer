const productsRouter = require('express').Router();
const shopifyAPIConsumer = require('../lib/shopify-api-consumer');
const middleware = require('../middleware/middleware');
// mounted at /api/v1/products

productsRouter.get('/', middleware.getAccessToken, (req, res, next) => {
  return shopifyAPIConsumer.get(
    req.query.shop,
    req.accessToken,
    '/products.json',
    'fields=id,image,title'
  ).then((customers) => res.send(customers).end())
  .catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

module.exports = productsRouter;