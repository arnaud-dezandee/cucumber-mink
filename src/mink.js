/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * Dependencies
 */

import _ from 'lodash';
import path from 'path';
import dbg from 'debug';
import Promise from 'bluebird';
import Immutable from 'immutable';
import pkg from '../package.json';

import Step from './step.js';
import Driver from './driver.js';

/**
 * Private
 */

const debug = dbg('mink');

/**
 * Public
 */

export const DEFAULT_PARAMS = {
  driver: {
    viewportSize: {
      width: 1366,
      height: 768,
    },
    baseUrl: process.env.BASE_URL,
    desiredCapabilities: {
      browserName: 'phantomjs',
    },
    logLevel: 'silent',
    port: 8910,
  },
};

class Mink {
  constructor() {
    this.steps = Immutable.Map();

    this.parameters = null;
    this.cucumber = null;
    this.driver = null;
  }

  /**
   * Mink initialization method and entry point
   *
   * @param {Object}  cucumber    cucumber-js context
   * @param {Object}  parameters
   * @returns {void}
   */
  init(cucumber, params = {}) {
    debug('init', params);

    const parameters = _.defaults(params, DEFAULT_PARAMS);
    const driver = new Driver(parameters.driver);

    this.parameters = parameters;
    this.cucumber = cucumber;
    this.driver = driver;

    this.registerHooks(cucumber, driver);

    // Load all Mink steps
    // Steps.register(this);
  }

  /**
   * Define a new step inside Mink-Cucumber context for use in .features files.
   *
   * @param {RegExp}    pattern    step regex
   * @param {Function}  fn         step function
   * @returns {Step}
   */
  defineStep(pattern, fn) {
    debug('defineStep', pattern);

    if (!this.steps.has(pattern)) {
      this.steps = this.steps.set(pattern, new Step(pattern, fn));

      if (this.cucumber) {
        this.cucumber.defineStep(pattern, fn.bind(this));
      }
    }

    return this.steps.get(pattern);
  }

  /**
   * Search for a matching registered step.
   *
   * @param {String} line
   * @returns {Step}
   */
  findStep(line) {
    debug('findStep', line);

    const step = this.steps.find(s => !!s.match(line));
    if (!step) throw new Error(`Could not findStep with line "${line}"`);

    return step;
  }

  /**
   * @param {String} input line
   * @returns {Promise}
   */
  runStep(line) {
    debug('runStep', line);

    const step = this.findStep(line);
    return step.runWith(this, line);
  }

  /**
   * @param {Array} lines
   * @returns {Promise}
   */
  manyStep(lines) {
    debug('manyStep', lines.join(', ').substr(0, 80));

    return Promise.each(lines, line => {
      return this.runStep(line);
    });
  }

  /**
   * @param {Array<Step>}
   * @returns {Promise}
   */
  metaStep(steps) {
    debug('metaStep', steps);

    return Promise.each(steps, step => {
      return step.runWith(this);
    });
  }

  /**
   * Register mink driver hooks on cucumber context
   *
   * @param {Object} Cucumber         cucumber-js context
   * @param {Object} DriverInstance   mink driver instance
   * @returns {void}
   */
  registerHooks(cucumber, driver) {
    cucumber.registerHandler('BeforeFeatures', () => {
      return driver.init().then(() => {
        return driver.setViewportSize(driver.parameters.viewportSize);
      });
    });

    cucumber.registerHandler('AfterFeatures', () => {
      return driver.end();
    });

    if (driver.parameters.screenshotPath) {
      cucumber.After(event => {
        if (!event.isFailed()) return null;

        const fileName = [event.getName() || 'Error', ':', event.getLine(), '.png'].join('');
        const filePath = path.join(driver.parameters.screenshotPath, fileName);
        return driver.saveScreenshot(filePath);
      });
    }
  }
}

// Aliases
Mink.prototype.Given = Mink.prototype.defineStep;
Mink.prototype.Then = Mink.prototype.defineStep;
Mink.prototype.When = Mink.prototype.defineStep;
Mink.prototype.VERSION = pkg.version;

/**
 * Interface
 */

export default new Mink();
