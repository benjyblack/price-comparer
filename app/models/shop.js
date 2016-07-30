const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  accessToken: String,
  scope: String
});

Object.assign(shopSchema.statics, {
  findOneAndUpsert(query, doc) {
    return this.findOne(query).then((shop) => {
      if (!shop) {
        shop = new this(doc);
      } else {
        console.warn(`${shop.name} has already been authorized`);
      }

      Object.assign(shop, doc);

      return shop.save();
    });
  },

  getAccessToken(name) {
    return this.findOne({ name }).then((doc) => {
      if (!doc) throw new Error(`No Shop exists with name ${name}`);

      return doc.accessToken;
    });
  },

  parseName(shopUrl) {
    return shopUrl
      .replace(/^http(s)?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\.myshopify\.com$/, '');
  }
});

module.exports = mongoose.model('Shop', shopSchema, 'shops');