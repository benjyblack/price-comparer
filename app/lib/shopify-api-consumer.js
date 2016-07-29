const n = require('nonce')();
const rp = require('request-promise');
const config = require('../../config/config');

const CALLBACK_URI = `http://${config.DOMAIN}:${config.PORT}/api/v1/auth/callback`;

module.exports.buildShopUrl = (shopName) => `https://${shopName}.myshopify.com`;

module.exports.buildAuthUrl = (shopName) => {
  const nonce = n();

  return `${this.buildShopUrl(shopName)}/admin/oauth/` +
  `authorize?client_id=${config.SHOPIFY_API_KEY}` +
  `&scope=${config.SCOPE}&redirect_uri=${CALLBACK_URI}` +
  `&state=${nonce}`;
};

module.exports.buildAuthenticatedHeaders = (accessToken) => ({ 'X-Shopify-Access-Token': accessToken });

module.exports.requestAccessToken = (shopName, code) =>
  rp({
      method: 'POST',
      json: true,
      uri: `${this.buildShopUrl(shopName)}/admin/oauth/access_token`,
      body: {
        client_id: config.SHOPIFY_API_KEY,
        client_secret: config.SHOPIFY_SHARED_SECRET,
        code
      }
    });

module.exports.get = (shopName, accessToken, resourcePath, options) =>
  rp({
    method: 'GET',
    json: true,
    uri: `${this.buildShopUrl(shopName)}/admin/${resourcePath}?${options}`,
    headers: this.buildAuthenticatedHeaders(accessToken)
  });  