var Mink   = require('../../../../lib/mink.js');
var Errors = require('../../../../lib/utils/errors.js');

var assert = require('chai').assert;

module.exports = function root(callback) {
  Mink.runStep('Given I browse "/hey-it-is-not-absolute:3000/"', function(err) {
    assert.isNotNull(err);
    assert.equal(err.message, Errors.NAVIGATION.BASE_URL);
    callback();
  });
};
