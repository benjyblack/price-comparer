const mongoose = require('mongoose');

const storeCredentialSchema = mongoose.Schema({
  shop: {
    type: String,
    required: true
  },
  accessToken: String,
  scope: String
});

Object.assign(storeCredentialSchema.statics, {
  findOneAndUpsert(query, doc) {
    return this.findOne(query).then((storeCredential) => {
      if (!storeCredential) {
        storeCredential = new this(doc);
      } else {
        console.warn(`${storeCredential.shop} has already been authorized`);
      }

      Object.assign(storeCredential, doc);

      return storeCredential.save();
    });
  },

  getAccessToken(shop) {
    return this.findOne({ shop }).then((doc) => doc.accessToken);
  },

  getShopName(shopUrl) {
    return shopUrl
      .replace(/^www\./, '')
      .replace(/\.myshopify\.com$/, '');
  }
});

module.exports = mongoose.model('StoreCredential', storeCredentialSchema, 'store-credentials');