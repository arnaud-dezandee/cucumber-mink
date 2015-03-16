var path = require('path');

module.exports = function(options) {
  var Mink = this;

  Mink.cucumber.registerHandler('BeforeFeatures', function (event, callback) {
    Mink.driver.init(function () {
      Mink.driver.setViewportSize({ width: 1366, height: 768 }, callback);
    });
  });

  Mink.cucumber.registerHandler('AfterFeatures', function (event, callback) {
    Mink.driver.end(callback);
  });

  if (options.screenshotPath) {
    Mink.cucumber.After(function (event, callback) {
      /* istanbul ignore else */
      if (!event.isFailed()) {
        callback();
      } else {
        var fileName = [event.getName() || 'Error', ':', event.getLine(), '.png'].join('');
        var filePath = path.join(options.screenshotPath, fileName);
        Mink.driver.saveScreenshot(filePath, callback);
      }
    });
  }
};
