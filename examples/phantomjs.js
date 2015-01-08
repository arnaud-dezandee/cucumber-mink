var mink = require('./../mink');

// Phantomjs - GhostDriver
var parameters = {
  driver: {
    type: 'webdriverio',
    options : {
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
