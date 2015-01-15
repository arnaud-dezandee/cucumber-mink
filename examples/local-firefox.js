var mink = require('./../lib/mink');

// Local Chrome
var parameters = {
  driver: {
    type: 'webdriverio',
    options: {
      logLevel: 'silent',
      desiredCapabilities: {
        browserName: 'firefox'
      },
      port: 4444
    }
  }
};

module.exports = function () {
  mink.call(this, parameters);
};
