#!/usr/bin/env node

/**
 * Dependencies
 */

const path = require('path');
const meow = require('meow');
const dbg = require('debug');
const cucumber = require('cucumber');
const Mink = require('./mink.js');

/**
 * CLI
 */

const debug = dbg('mink:cli');

const cli = meow(`
  Usage: cucumber-mink [options] -- [CUCUMBER ARGS]

  Options:
    --inject       Mink auto-inject in context           [Boolean] [default: true]
    --browser      Desired browser name              [String] [default: "firefox"]
    --port         Selenium server port                            [default: 4444]
    --timeout      Cucumber function timeout in ms                 [default: 5000]
    -h, --help     Display help message                                  [Boolean]
    -v, --version  Display package version                               [Boolean]
`, {
    default: {
      inject: true,
      browser: 'chrome',
      port: 4444,
      timeout: 5000,
    },
    boolean: ['inject'],
    alias: {
      v: 'version',
      h: 'help',
    },
  });

const injectArgs = (flags) => {
  if (!flags.inject) return [];

  Mink.configure({
    driver: {
      desiredCapabilities: {
        browserName: flags.browser,
      },
      port: flags.port,
    },
    timeout: flags.timeout,
  });

  const injectPath = path.join(__dirname, '/cli/support/mink_inject.js');
  return ['--require', injectPath];
};

const execArgs = [
  'node', 'cucumber-js',
  ...injectArgs(cli.flags),
  ...cli.input,
];

debug(execArgs);

const cucumberCli = new cucumber.Cli({
  argv: execArgs,
  cwd: process.cwd(),
  stdout: process.stdout,
});

cucumberCli.run((success) => {
  process.exit(success ? 0 : 1);
});
