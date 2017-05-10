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

import path from 'path';
import dbg from 'debug';
import arity from 'util-arity';
import Promise from 'bluebird';
import Immutable from 'immutable';
import defaultsDeep from 'lodash.defaultsdeep';
import pkg from '../package.json';

import Step from './step.js';
import configureDriver from './driver.js';
import definitions from './step_definitions/index.js';

/**
 * Private
 */

const debug = dbg('mink');

const DEFAULT_PARAMS = {
  driver: {
    viewportSize: {
      width: 1366,
      height: 768,
    },
    baseUrl: process.env.BASE_URL,
    desiredCapabilities: {
      browserName: 'chrome',
    },
    logLevel: 'silent',
    port: 4444,
  },
  timeout: 5000,
  screenshotMethod: 'saveScreenshot',
};

function noop() {
  // No operation performed.
}

/**
 * Public
 */

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

    const parameters = defaultsDeep(params, DEFAULT_PARAMS);
    const driver = configureDriver(parameters.driver);

    this.parameters = parameters;
    this.cucumber = cucumber;
    this.driver = driver;

    this.registerHooks(cucumber, driver);

    definitions.forEach(([pattern, fn]) => {
      this.defineStep(pattern, fn);
    });
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
        const wrappedFn = arity(fn.length, (...args) =>
          Promise.try(() => fn.apply(this, args)),
        );
        this.cucumber.defineStep(pattern, wrappedFn);
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
  runStep(line, cb = noop) {
    debug('runStep', line);

    const step = this.findStep(line);
    return step.runWith(this, line, cb);
  }

  /**
   * @param {Array} lines
   * @returns {Promise}
   */
  manyStep(lines, cb = noop) {
    debug('manyStep', lines.join(', ').substr(0, 80));

    return Promise.each(lines, line => (
      this.runStep(line)
    )).asCallback(cb);
  }

  /**
   * @param {Array<Step>}
   * @returns {Promise}
   */
  metaStep(steps, cb = noop) {
    debug('metaStep', steps);

    return Promise.each(steps, step => (
      step.runWith(this)
    )).asCallback(cb);
  }

  /**
   * Register mink driver hooks on cucumber context
   *
   * @param {Object} Cucumber         cucumber-js context
   * @param {Object} DriverInstance   mink driver instance
   * @returns {void}
   */
  registerHooks(cucumber, driver) {
    cucumber.registerHandler('BeforeFeatures', (/* event */) =>
      driver.init().then(() => (
        driver.setViewportSize(driver.parameters.viewportSize)
      )),
    );

    cucumber.registerHandler('AfterFeatures', (/* event */) =>
      driver.end(),
    );

    cucumber.setDefaultTimeout(this.parameters.timeout);

    if (driver.parameters.screenshotPath) {
      cucumber.After((event) => {
        if (!event.isFailed()) return null;

        const fileName = [event.getName() || 'Error', ':', event.getLine(), '.png'].join('');
        const filePath = path.join(driver.parameters.screenshotPath, fileName);
        return driver[this.parameters.screenshotMethod](filePath);
      });
    }
  }
}

// Aliases
Mink.prototype.Given = Mink.prototype.defineStep;
Mink.prototype.Then = Mink.prototype.defineStep;
Mink.prototype.When = Mink.prototype.defineStep;
Mink.prototype.DEFAULT_PARAMS = DEFAULT_PARAMS;
Mink.prototype.VERSION = pkg.version;

/**
 * Interface
 */

export default new Mink();
