var mink = require('./../lib/mink');

// Phantomjs - GhostDriver
var parameters = {
  driver: {
    screenshotPath: 'test/',
    desiredCapabilities: {
      browserName: 'phantomjs'
    },
    logLevel: 'silent',
    port: 8910
  }
};

module.exports = function () {
  mink.init(this, parameters);
};
