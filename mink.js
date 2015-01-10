/**
 * cucumber-mink
 * https://github.com/AXA-GROUP-SOLUTIONS/cucumber-mink
 *
 * cucumber.js BDD Framework step definitions library
 *
 * Copyright (c) 2014 AXA Group Solutions
 * Licensed under the MIT license.
 *
 * Contributors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var _ = require('lodash');

var drivers = require('./lib/drivers'),
    steps   = require('./lib/steps'),
    utils   = require('./lib/utils'),
    pkg     = require('./package.json');

var DEFAULT_PARAMS = {
  driver: {
    type: 'zombie'
  },
  debug: false
};

// Call Mink inside Cucumber.js context when using --require
module.exports = function(parameters) {
  parameters = _.defaults(parameters || {}, DEFAULT_PARAMS);

  if (parameters.driver.type === 'zombie') {
    drivers.Zombie.call(this, parameters.driver.options);
  }
  if (parameters.driver.type === 'webdriverio') {
    drivers.WebDriverIO.call(this, parameters.driver.options);
  }

  // Shorten error stack traces if not in debug mode
  if (! parameters.debug) {
    utils.StackTraces();
  }

  // Load all Mink's steps into Cucumber context
  steps.call(this);
};

// Expose version
module.exports.version  = pkg.version;

// Expose modules
module.exports.Drivers  = drivers;
module.exports.Steps    = steps;
module.exports.Utils    = utils;
