const productsRouter = require('express').Router();
const rp = require('request-promise');
const config = require('../../config/config');

const middleware = require('../middleware/middleware');
// mounted at /api/v1/products

productsRouter.get('/', middleware.getAccessToken, (req, res, next) => {
  debugger;
  rp({
    method: 'GET',
    url: 'https://api.shopify.com/admin/products.json?fields=id,images,title',
    headers: {
      'X-Shopify-Access-Token': req.accessToken
    }
  }).then((products) => {
    debugger;
  });
});

module.exports = productsRouter;