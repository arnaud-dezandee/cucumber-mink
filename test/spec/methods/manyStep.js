var Mink = require('../../../src/mink');

module.exports = function manyStep(callback) {
  Mink.manyStep([
    'I browse "http://localhost:3000/"',
    'I am on the homepage',
    'I should be on the homepage'
  ], callback);
};
