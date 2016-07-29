const StoreCredential = require('../models/store-credential');

module.exports.getAccessToken = (req, res, next) => {
  debugger;
  return StoreCredential.getAccessToken(req.query.shop).then((accessToken) => {
    debugger;
    req.accessToken = accessToken;
    return next();
  });
};

module.exports.addAccessToken = (req, res, next) => {
  res.header('X-Shopify-Access-Token', req.accessToken);
  next();
};