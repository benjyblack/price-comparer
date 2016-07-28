const config = require('../../config/config');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.DB_URI);

    const db = mongoose.connection;
    db.on('error', (err) => {
      console.error(err);
      reject(err);
    });

    db.once('open', () => {
      console.log('Connected to MongoDB!');
      resolve();
    });
  });
};