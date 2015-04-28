var Mink  = require('../../../lib/mink');

var assert = require('chai').assert;

module.exports = function click(callback) {
  Mink.driver.click({}, function(err) {
    assert.isNotNull(err);
    assert.equal(err.message, 'Type mismatch, selector should be string or WebElement obj');
    callback();
  });
};
