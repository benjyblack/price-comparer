const n = require('nonce')();
const rp = require('request-promise');
const config = require('../../config/config');

const StoreCredential = require('../models/store-credential');

const CALLBACK_URI = `http://${config.DOMAIN}:${config.PORT}/api/auth/callback`;

module.exports.root = (req, res) => {
  const shopName = req.query.shop;
  const nonce = n();

  return res.redirect(301,
    `https://${shopName}.myshopify.com/admin/oauth/` +
    `authorize?client_id=${config.SHOPIFY_API_KEY}` +
    `&scope=${config.SCOPE}&redirect_uri=${CALLBACK_URI}` +
    `&state=${nonce}`);
}

module.exports.callback = (req, res) => {
  const shop = req.query.shop;
  const code = req.query.code;

  // TODO: Check security features (Step 3) https://help.shopify.com/api/guides/authentication/oauth
  return Promise.all([
    rp({
      method: 'POST',
      uri: `https://${shop}/admin/oauth/access_token`,
      body: {
        client_id: config.SHOPIFY_API_KEY,
        client_secret: config.SHOPIFY_SHARED_SECRET,
        code
      },
      json: true
    }),
    StoreCredential.findOne({ shop })
  ]).then(([response, storeCredential]) => {
    if (!storeCredential) {
      storeCredential = new StoreCredential({ shop });
    } else {
      console.warn(`${shop} has already been authorized`);
    }

    storeCredential.accessToken = response.accessToken;
    storeCredential.scope = response.scope;

    return storeCredential.save();
  }).then(() => {
    console.log('StoreCredentials updated');
  });
}