/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
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
  driver: {
    desiredCapabilities: {
      browserName: 'phantomjs'
    },
    logLevel: 'silent',
    port: 8910
  },
  debug: false
};

// Handle mink.call() backward compatibility
var mink = function(parameters) {
  mink.init(this, parameters);
};

mink.init = function init(Cucumber, parameters) {
  parameters = _.defaults(parameters || {}, DEFAULT_PARAMS);
  // Shorten stack traces if not debug
  if (!parameters.debug) {
    stackTraces();
  }

  // Attach Cucumber to Mink context
  mink.cucumber = Cucumber;

  // Init Mink driver
  driver.call(mink, parameters.driver);
  hooks.call(mink, parameters.driver);

  // Mink custom defineStep
  defineStep.call(mink);
  // Load all Mink steps
  allSteps.call(mink);
};

mink.metaStep = metaBuilder;
mink.version  = pkg.version;
mink.Ext      = allExt;

module.exports = mink;
