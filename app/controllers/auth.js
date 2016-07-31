const authRouter = require('express').Router();
const config = require('../../config/config');

const shopifyAPIConsumer = require('../lib/shopify-api-consumer');

const Shop = require('../models/shop');

// mounted at /api/v1/auth

authRouter.get('/', (req, res) => res.redirect(301, shopifyAPIConsumer.buildAuthUrl(req.query.shop)));

authRouter.get('/callback', (req, res) => {
  const name = Shop.parseName(req.query.shop);
  const code = req.query.code;
  // TODO: Check security features (Step 3) https://help.shopify.com/api/guides/authentication/oauth
  return shopifyAPIConsumer.requestAccessToken(name, code).then((response) =>
    Shop.findOneAndUpsert({ name }, {
      accessToken: response['access_token'],
      scope: response.scope,
      name
    })
  ).then(() => {
    console.log('Shop updated');
    res.status(200).end();
  }).catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

module.exports = authRouter;