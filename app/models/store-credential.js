const mongoose = require('mongoose');

const StoreCredential = mongoose.model('StoreCredential', mongoose.Schema({
  shop: String,
  accessToken: String,
  scope: String
}), 'store-credentials');

module.exports = StoreCredential;