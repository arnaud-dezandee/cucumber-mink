var Mink  = require('../../../lib/mink');

var fs = require('fs'),
    async = require('async'),
    assert = require('chai').assert;

module.exports = function saveScreenshotTest(callback) {
  async.series([
    // Execute saveScreenshot Step
    function(cb) {
      Mink.runStep('I take a screenshot', cb);
    },
    // Assert Screenshot file exists?
    function(cb) {
      fs.exists('./screenshot.png', function(exists) {
        cb(assert.equal(exists, true));
      });
    },
    // Delete the file
    function(cb) {
      fs.unlink('./screenshot.png', cb);
    }
  ], callback);
};
