/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var _ = require('lodash');

var Driver = require('../driver');
var Steps  = require('../step_definitions');
var errors = require('../utils/errors.js');

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

/**
 * Mink initialization method and entry point
 * @param {Object}  Cucumber    cucumber-js context
 * @param {Object}  parameters
 */
module.exports = function init(Cucumber, parameters) {
  parameters = _.defaults(parameters || {}, DEFAULT_PARAMS);

  // Relevant errors logs only if not debug
  if (!parameters.debug) {
    errors.relevant();
  }

  // Attach Cucumber to Mink context
  this.cucumber   = Cucumber;
  this.parameters = parameters;

  // Init Mink driver
  this.driver = Driver.create(parameters.driver);
  this.registerHooks(Cucumber, this.driver);

  // Load all Mink steps
  Steps.register(this);
};
