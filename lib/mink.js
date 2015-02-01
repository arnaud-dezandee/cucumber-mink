/**
 * cucumber-mink
 * https://github.com/AXA-GROUP-SOLUTIONS/cucumber-mink
 *
 * cucumber-js BDD Framework step definitions library
 *
 * Copyright (c) 2015 AXA Group Solutions
 * Licensed under the MIT license.
 *
 * Contributors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var _ = require('lodash');

var world     = require('./world/webdriverio'),
  allSteps    = require('./step_definitions/all'),
  allExt      = require('./step_definitions/ext'),
  defineStep  = require('./utils/define-step'),
  metaBuilder = require('./utils/meta-builder'),
  stackTraces = require('./utils/stack-traces'),
  pkg         = require('./../package.json');

var DEFAULT_PARAMS = {
  driver: {
    type: 'webdriverio'
  },
  debug: false
};

// Call Mink inside Cucumber.js context when using --require
module.exports = function(parameters) {
  parameters = _.defaults(parameters || {}, DEFAULT_PARAMS);
  if (!parameters.debug) {
    stackTraces();
  }

  // Init Mink World
  world.call(this, parameters.driver.options);
  // Override Cucumber defineStep
  defineStep.call(this);
  // Load all Mink steps
  allSteps.call(this);
};

module.exports.version  = pkg.version;
module.exports.Ext      = allExt;
module.exports.metaStep = metaBuilder;
