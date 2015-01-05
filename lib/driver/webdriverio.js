// WebDriverIO Initialisation
var WDInterface = require('./interface/webdriverio'),
    WebDriverIO = require('webdriverio'),
    _           = require('lodash');

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
  var driver = WDInterface(client);

  this.World = function World(callback) {
    this.driver = driver;
    this.driver.ready(callback);
  };

  this.registerHandler('BeforeFeatures', function (event, callback) {
    driver.init(callback);
  });

  this.registerHandler('AfterFeatures', function (event, callback) {
    driver.end(callback);
  });
};
