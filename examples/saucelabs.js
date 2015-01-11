var mink = require('./../lib/mink');

// SauceLabs
var parameters = {
  driver: {
    type: 'webdriverio',
    options : {
      desiredCapabilities: {
        browserName: 'chrome',
        version: '27',
        platform: 'XP',
        tags: ['examples'],
        name: 'This is an example test'
      },
      host: 'ondemand.saucelabs.com',
      user: process.env.SAUCE_USERNAME,
      key:  process.env.SAUCE_ACCESS_KEY,
      logLevel: 'silent'
    }
  }
};

module.exports = function () {
  mink.call(this, parameters);
};
