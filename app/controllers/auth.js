const authRouter = require('express').Router();
const config = require('../../config/config');

const shopifyApiConsumer = require('../lib/shopify-api-consumer');

const StoreCredential = require('../models/store-credential');

// mounted at /api/v1/auth

authRouter.get('/', (req, res) => res.redirect(301, shopifyApiConsumer.buildAuthUrl(req.query.shop)));

authRouter.get('/callback', (req, res) => {
  const shop = StoreCredential.getShopName(req.query.shop);
  const code = req.query.code;
  // TODO: Check security features (Step 3) https://help.shopify.com/api/guides/authentication/oauth
  return shopifyApiConsumer.requestAccessToken(shop, code).then((response) =>
    StoreCredential.findOneAndUpsert({ shop }, {
      accessToken: response['access_token'],
      scope: response.scope,
      shop
    })
  ).then(() => {
    console.log('StoreCredentials updated');
    res.status(200).end();
  }).catch((err) => {
    console.error(err);
    res.status(500).end();
  });
});

module.exports = authRouter;