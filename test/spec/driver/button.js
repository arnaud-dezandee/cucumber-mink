var Mink  = require('../../../lib/mink');
var Errors = require('../../../lib/utils/errors.js');

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
        assert.equal(err.message, Errors.ACTION.CLICK_BUTTON + ' .button-missing');
        cb();
      });
    }
  ], callback);
};
