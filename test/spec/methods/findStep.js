var Mink = require('../../../lib/mink');

var assert = require('chai').assert;

module.exports = function findStep(callback) {
  try {
    Mink.findStep('I invoke a missing step');
  } catch(error) {
    assert.isNotNull(error);
    assert.equal(error.message, 'Could not find matching step for text: I invoke a missing step');
    callback();
  }
};
