require('babel-register');
const Mink = require('../../../src/mink.js').default;

module.exports = function () {
  Mink.init(this);
};
