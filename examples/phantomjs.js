var mink = require('./../lib/mink');

// Phantomjs - GhostDriver
var parameters = {
  driver: {
    type: 'webdriverio',
    options: {
      screenshotPath: 'test/',
      desiredCapabilities: {
        browserName: 'phantomjs'
      },
      logLevel: 'silent',
      port: 8910
    }
  }
};

module.exports = function () {
  mink.call(this, parameters);
};
