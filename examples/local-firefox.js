var mink = require('./../lib/mink');

// Local Chrome
var parameters = {
  driver: {
    logLevel: 'silent',
    desiredCapabilities: {
      browserName: 'firefox'
    },
    port: 4444
  }
};

module.exports = function () {
  mink.init(this, parameters);
};
