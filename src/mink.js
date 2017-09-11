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

const path = require('path');
const dbg = require('debug');
const arity = require('util-arity');
const Promise = require('bluebird');
const Immutable = require('immutable');
const defaultsDeep = require('lodash.defaultsdeep');
const pkg = require('../package.json');

const Step = require('./step.js');
const configureDriver = require('./driver.js');
const definitions = require('./step_definitions/index.js');

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
    deprecationWarnings: false,
  },
  timeout: 5000,
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

    this.parameters = DEFAULT_PARAMS;
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
  init(cucumber) {
    debug('init');

    const driver = configureDriver(this.parameters.driver);
    this.cucumber = cucumber;
    this.driver = driver;

    this.registerHooks(cucumber, driver);

    definitions.forEach(([pattern, fn]) => {
      this.defineStep(pattern, fn);
    });
  }

  /**
   * Mink configuration method
   *
   * @param {Object}  parameters
   * @returns {void}
   */
  configure(params = {}) {
    debug('configure', params);
    this.parameters = defaultsDeep(params, DEFAULT_PARAMS);
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
        const wrappedFn = arity(fn.length, (...args) => (
          Promise.try(() => fn.apply(this, args))
        ));
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
    cucumber.BeforeAll(() => (
      driver.init().then(() => (
        driver.setViewportSize(driver.parameters.viewportSize)
      ))
    ));
    cucumber.AfterAll(() => (
      driver.end()
    ));

    cucumber.setDefaultTimeout(this.parameters.timeout);

    if (driver.parameters.screenshotPath) {
      cucumber.After((event) => {
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
Mink.prototype.DEFAULT_PARAMS = DEFAULT_PARAMS;
Mink.prototype.VERSION = pkg.version;

/**
 * Interface
 */

module.exports = new Mink();
