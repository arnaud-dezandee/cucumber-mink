/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/* eslint new-cap: 0 */
import path from 'path';

/**
 * Register mink driver hooks on cucumber context
 * @param {Object}  Cucumber    cucumber-js context
 * @param {Object}  Driver      mink driver instance
 */
export default function registerHooks(Cucumber, Driver) {
  const options = Driver.options;

  Cucumber.registerHandler('BeforeFeatures', (event, callback) => {
    Driver.init(() => {
      Driver.setViewportSize({ width: 1366, height: 768 }, callback);
    });
  });

  Cucumber.registerHandler('AfterFeatures', (event, callback) => {
    Driver.end(callback);
  });

  /* istanbul ignore next */
  if (options.screenshotPath) {
    Cucumber.After((event, callback) => {
      if (!event.isFailed()) {
        return callback();
      }
      const fileName = [event.getName() || 'Error', ':', event.getLine(), '.png'].join('');
      const filePath = path.join(options.screenshotPath, fileName);
      Driver.saveScreenshot(filePath, callback);
    });
  }
}
