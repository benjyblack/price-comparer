const mongoose = require('mongoose');

const StoreCredential = mongoose.model('StoreCredential', mongoose.Schema({
  shop: {
    type: String,
    required: true
  },
  accessToken: String,
  scope: String
}), 'store-credentials');

module.exports = StoreCredential;