var mink = require('./../lib/mink');

// Local Chrome
var parameters = {
  driver: {
    logLevel: 'silent',
    desiredCapabilities: {
      browserName: 'chrome'
    },
    port: 9515
  }
};

module.exports = function () {
  mink.init(this, parameters);
};
