var Mink   = require('../../../../lib/mink.js');
var Errors = require('../../../../lib/utils/errors.js');

var assert = require('chai').assert;

module.exports = function root(callback) {
  Mink.driver.baseUrl = null;
  Mink.runStep('I go to the homepage', function(err) {
    assert.isNotNull(err);
    assert.equal(err.message, Errors.NAVIGATION.ROOT);
    callback();
  });
};
