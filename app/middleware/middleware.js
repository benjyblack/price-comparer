module.exports.addAccessToken = (req, res, next) => {
  res.header('X-Shopify-Access-Token', req.accessToken);
  next();
};