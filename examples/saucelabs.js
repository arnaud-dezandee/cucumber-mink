var mink = require('./../lib/mink');

// SauceLabs
var parameters = {
  driver: {
    desiredCapabilities: {
      browserName:  'chrome',
      version:      '27',
      platform:     'XP',
      tags:         ['examples'],
      name:         'This is an example test'
    },
    host:     'ondemand.saucelabs.com',
    port:     80,
    user:     process.env.SAUCE_USERNAME,
    key:      process.env.SAUCE_ACCESS_KEY,
    logLevel: 'silent'
  }
};

module.exports = function () {
  mink.init(this, parameters);
};
