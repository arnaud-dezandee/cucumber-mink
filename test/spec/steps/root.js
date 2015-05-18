var Mink  = require('../../../lib/mink');

var assert = require('chai').assert;

module.exports = function root(callback) {
  Mink.driver.baseUrl = null;
  Mink.runStep('I go to the homepage', function(err) {
    assert.isNotNull(err);
    assert.equal(err.message, 'Please provide a base url to use root functions !');
    callback();
  });
};
