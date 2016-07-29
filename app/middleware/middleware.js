const Shop = require('../models/shop');

module.exports.getAccessToken = (req, res, next) => {
  const shopName = Shop.parseName(req.query.shop);

  return Shop.getAccessToken(shopName).then((accessToken) => {
    req.accessToken = accessToken;
    return next();
  }).catch((err) => {
    console.error(err, `Error getting access token for ${shopName}`);
  });
}