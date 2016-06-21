require('babel-register');
const Mink = require('../../../src/mink.js');

module.exports = function () {
  Mink.init(this, {
    driver: { protractor: true },
  });
};
