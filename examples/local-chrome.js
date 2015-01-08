var mink = require('./../mink');

// Local Chrome
var parameters = {
  driver: {
    type: 'webdriverio',
    options: {
      logLevel: 'silent',
      desiredCapabilities: {
        browserName: 'chrome'
      },
      port: 9515
    }
  }
};

module.exports = function () {
  mink.call(this, parameters);
};
