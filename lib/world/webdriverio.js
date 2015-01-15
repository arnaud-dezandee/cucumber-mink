var _ = require('lodash');
var path = require('path');

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

  if (options.screenshotPath) {
    this.After(function (event, callback) {
      if (! event.isFailed()) { callback(); }
      else {
        var fileName = path.join(options.screenshotPath, event.getName() + ':' + event.getLine() + '.png');
        driver.saveScreenshot(fileName, callback);
      }
    });
  }
};
