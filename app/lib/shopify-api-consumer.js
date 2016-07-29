const n = require('nonce')();
const rp = require('request-promise');
const config = require('../../config/config');

const CALLBACK_URI = `http://${config.DOMAIN}:${config.PORT}/api/v1/auth/callback`;

module.exports.buildAuthUrl = (shop) => {
  const nonce = n();

  return `https://${shop}.myshopify.com/admin/oauth/` +
  `authorize?client_id=${config.SHOPIFY_API_KEY}` +
  `&scope=${config.SCOPE}&redirect_uri=${CALLBACK_URI}` +
  `&state=${nonce}`;
};

module.exports.requestAccessToken = (shop, code) =>
  rp({
      method: 'POST',
      uri: `https://${shop}.myshopify.com/admin/oauth/access_token`,
      body: {
        client_id: config.SHOPIFY_API_KEY,
        client_secret: config.SHOPIFY_SHARED_SECRET,
        code
      },
      json: true
    });