var Mink  = require('../../../lib/mink');

var async = require('async'),
    assert = require('chai').assert;

module.exports = function button(callback) {
  async.parallel([
    // Execute driver button internal method
    function(cb) {
      Mink.driver.button('.button-missing', function (err) {
        assert.isNotNull(err);
        assert.equal(err.message, 'Button not found !');
        cb();
      });
    },
    // Execute button step
    function(cb) {
      Mink.runStep('I press ".button-missing"', function(err) {
        assert.isNotNull(err);
        assert.equal(err.message, 'Unable to find button / input[type=submit] with selector or text matching .button-missing');
        cb();
      });
    }
  ], callback);
};
