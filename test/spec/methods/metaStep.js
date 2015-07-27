var Mink = require('../../../lib/mink');

var async  = require('async');
var assert = require('chai').assert;

module.exports = function metaStep(callback) {
  var stepArray1 = [{
    fn: function(cb) { cb.fail(new Error('MB Failing !')); },
    args: []
  }];
  var stepArray2 = [{
    fn: function(cb) { cb.fail('MB Failing !'); },
    args: []
  }];
  var stepArray3 = [{
    fn: function(cb) { cb(new Error('MB Failing !')); },
    args: []
  }];

  async.every([stepArray1, stepArray2, stepArray3], function(stepArray, cb) {
    Mink.metaStep(stepArray, function(err) {
      assert.isNotNull(err);
      assert.equal(err.message, 'MB Failing !');
      cb(true);
    });
  }, function() { callback(); });
};
