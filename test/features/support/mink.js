var mink = require('../../../lib/mink.js');

module.exports = function () {
  // Test for backward compatibility, otherwise use .init()
  mink.call(this);
};
