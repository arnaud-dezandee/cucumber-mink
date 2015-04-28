var Mink  = require('../../../lib/mink');

var async = require('async'),
    assert = require('chai').assert;

module.exports = function button(callback) {
  async.parallel([
    // Execute driver button internal method
    function(cb) {
      Mink.driver.link('.link-missing', function (err) {
        assert.isNotNull(err);
        assert.equal(err.message, 'Link not found !');
        cb();
      });
    },
    // Execute button step
    function(cb) {
      Mink.runStep('I follow ".link-missing"', function(err) {
        assert.isNotNull(err);
        assert.equal(err.message, 'Unable to find a link with selector or text matching .link-missing');
        cb();
      });
    }
  ], callback);
};
