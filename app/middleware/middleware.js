const Shop = require('../models/shop');

module.exports.getAccessToken = (req, res, next) =>
  Shop.getAccessToken(Shop.parseName(req.query.shop)).then((accessToken) => {
    req.accessToken = accessToken;
    return next();
  });