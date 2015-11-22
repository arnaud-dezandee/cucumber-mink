/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

import _ from 'lodash';
import Driver from '../driver';
import Steps from '../step_definitions';

const DEFAULT_PARAMS = {
  driver: {
    baseUrl: process.env.BASE_URL || null,
    desiredCapabilities: {
      browserName: 'phantomjs',
    },
    logLevel: 'silent',
    port: 8910,
  },
};

/**
 * Mink initialization method and entry point
 * @param {Object}  Cucumber    cucumber-js context
 * @param {Object}  parameters
 */
export default function init(Cucumber, parameters) {
  const params = _.defaults(parameters || {}, DEFAULT_PARAMS);

  // Attach Cucumber to Mink context
  this.cucumber = Cucumber;
  this.parameters = params;

  // Init Mink driver
  this.driver = Driver.create(parameters.driver);
  this.registerHooks(Cucumber, this.driver);

  // Load all Mink steps
  Steps.register(this);
}
