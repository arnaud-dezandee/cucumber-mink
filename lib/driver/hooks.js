/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var path = require('path');

module.exports = function(options) {
  var cucumber = this.cucumber;
  var driver   = this.driver;

  cucumber.registerHandler('BeforeFeatures', function (event, callback) {
    driver.init(function () {
      driver.setViewportSize({ width: 1366, height: 768 }, callback);
    });
  });

  cucumber.registerHandler('AfterFeatures', function (event, callback) {
    driver.end(callback);
  });

  if (options.screenshotPath) {
    cucumber.After(function (event, callback) {
      /* istanbul ignore else */
      if (!event.isFailed()) {
        callback();
      } else {
        var fileName = [event.getName() || 'Error', ':', event.getLine(), '.png'].join('');
        var filePath = path.join(options.screenshotPath, fileName);
        driver.saveScreenshot(filePath, callback);
      }
    });
  }
};
