var _ = require('lodash');

// WebDriverIO Initialisation
var WebDriverIO  = require('webdriverio'),
    CustomDriver = require('./../driver/webdriverio');

var WD_DEFAULTS = {
  desiredCapabilities: {
    browserName: 'phantomjs'
  },
  logLevel: 'silent',
  port: 8910
};

module.exports = function(options) {
  options = _.defaults(options || {}, WD_DEFAULTS);
  var client = WebDriverIO.remote(options);
  var driver = CustomDriver.init(client);

  this.World = function World(callback) {
    this.driver = driver;
    this.driver.ready(callback);
  };

  this.registerHandler('BeforeFeatures', function (event, callback) {
    driver.init(function () {
      driver.setViewportSize({ width: 1366, height: 768 }, callback);
    });

  });

  this.registerHandler('AfterFeatures', function (event, callback) {
    driver.end(callback);
  });
};
