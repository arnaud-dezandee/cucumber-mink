#!/usr/bin/env node

/**
 * Dependencies
 */

import path from 'path';
import meow from 'meow';
import dbg from 'debug';
import cucumber from 'cucumber';
import startMocking from './cli/rewire.js';
import Mink from './mink.js';

/**
 * CLI
 */

const debug = dbg('mink:cli');

const cli = meow(`
  Usage: cucumber-mink [options] -- [CUCUMBER ARGS]

  Options:
    --inject            Mink auto-inject in context                     [Boolean] [default: true]
    --browser           Desired browser name                        [String] [default: "firefox"]
    --port              Selenium server port                                      [default: 4444]
    --timeout           Cucumber function timeout in ms                           [default: 5000]
    --screenshot-path   Path to which to save screenshots on failure    [String] [default: empty]
    --wdio-screenshot   Use wdio-screenshot if defined. One of:         [String] [default: empty]
                          * 'viewport' - save screenshot of viewport only
                          * 'document' - save screenshot of entire document
    -h, --help          Display help message                                            [Boolean]
    -v, --version       Display package version                                         [Boolean]
`, {
  default: {
    inject: true,
    browser: 'chrome',
    port: 4444,
    timeout: 5000,
    'screenshot-path': undefined, // showing default for clarity
    'wdio-screenshot': undefined, // showing default for clarity
  },
  boolean: ['inject'],
  alias: {
    v: 'version',
    h: 'help',
  },
});

const configureWDIOScreenshot = (params, method) => {
  const newParams = params;
  switch (method) {
    case undefined: {
      break;
    }
    case 'viewport' || 'document': {
      newParams.driver.plugins = { 'wdio-screenshot': {} };
      newParams.screenshotMethod = `save${method.charAt(0).toUpperCase()}${method.slice(1)}Screenshot`;
      break;
    }
    default: {
      throw new Error(`'${method}' is not a valid value. Use one of: 'viewport', 'document'`);
    }
  }
  return newParams;
};

const injectArgs = (flags) => {
  if (!flags.inject) return [];

  let params = Mink.DEFAULT_PARAMS;
  params.driver.desiredCapabilities.browserName = flags.browser;
  params.driver.port = flags.port;
  params.timeout = flags.timeout;
  params.driver.screenshotPath = flags['screenshot-path'];
  params = configureWDIOScreenshot(params, flags['wdio-screenshot']);

  const inject = require('./cli/support/mink_inject.js');

  const injectPath = path.join(__dirname, '/cli/support/mink_inject.js');
  startMocking(injectPath, inject(params));

  return ['--require', injectPath];
};

const execArgs = [
  'node', 'cucumber-js',
  ...injectArgs(cli.flags),
  ...cli.input,
];

debug(execArgs);

cucumber.Cli(execArgs).run((success) => {
  process.exit(success ? 0 : 1);
});
