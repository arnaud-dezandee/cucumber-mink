/**
 * cucumber-mink
 * https://github.com/Adezandee/cucumber-mink
 *
 * cucumber-js step definitions library
 *
 * Copyright (c) 2015 AXA Group Solutions
 * Licensed under the MIT license.
 *
 * Contributors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var _ = require('lodash');

var driver    = require('./driver/driver.js'),
  hooks       = require('./driver/hooks.js'),
  allSteps    = require('./step_definitions/all.js'),
  allExt      = require('./step_definitions/ext'),
  defineStep  = require('./utils/define-step.js'),
  metaBuilder = require('./utils/meta-builder.js'),
  stackTraces = require('./utils/stack-traces.js'),
  pkg         = require('./../package.json');

var DEFAULT_PARAMS = {
  driver: {},
  debug: false
};

// Handle mink.call() backward compatibility
var Mink = function(parameters) {
  Mink.init(this, parameters);
};

Mink.init = function init(Cucumber, parameters) {
  parameters = _.defaults(parameters || {}, DEFAULT_PARAMS);
  // Shorten stack traces if not debug
  if (!parameters.debug) {
    stackTraces();
  }

  // Attach mink to cucumber context
  Mink.cucumber = Cucumber;
  Cucumber.mink = Mink;

  // Init Mink driver
  driver.call(Mink, parameters.driver);
  hooks.call(Mink, parameters.driver);

  // Mink custom defineStep
  defineStep.call(Mink);
  // Load all Mink steps
  allSteps.call(Mink);
};

Mink.version  = pkg.version;
Mink.Ext      = allExt;
Mink.metaStep = metaBuilder;

module.exports = Mink;
