const expect = require('chai').expect;


const Shop = require('../../app/models/shop');

describe('Shop:', () => {
  it('can parse a shop\'s name from a shop URL', () => {
    const variants = [
      'test-shop',
      'test-shop.myshopify.com',
      'http://test-shop.myshopify.com',
      'http://www.test-shop.myshopify.com',
      'https://test-shop.myshopify.com',
      'https://www.test-shop.myshopify.com'
    ];

    variants.forEach((variant) => expect(Shop.parseName(variant)).to.equal('test-shop'));
  });
});