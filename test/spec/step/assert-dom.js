var Mink   = require('../../../lib/mink.js');

var chai = require('chai');
var assert = chai.assert;
var AssertionError = chai.AssertionError;

module.exports = function root(callback) {
  Mink.runStep('Then I should see "Hello world"', function(err) {
    assert.isNotNull(err);
    assert(err instanceof AssertionError);
    callback();
  });
};
