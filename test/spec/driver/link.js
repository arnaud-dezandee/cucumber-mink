var Mink  = require('../../../lib/mink');
var Errors = require('../../../lib/utils/errors.js');

var async = require('async'),
    assert = require('chai').assert;

module.exports = function button(callback) {
  async.parallel([
    // Execute driver link internal method
    function(cb) {
      Mink.driver.link('.link-missing', function (err) {
        assert.isNotNull(err);
        assert.equal(err.message, 'Link not found !');
        cb();
      });
    },
    // Execute follow step
    function(cb) {
      Mink.runStep('I follow ".link-missing"', function(err) {
        assert.isNotNull(err);
        assert.equal(err.message, Errors.ACTION.CLICK_LINK + ' .link-missing');
        cb();
      });
    }
  ], callback);
};
