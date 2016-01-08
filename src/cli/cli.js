/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/* eslint no-console:0 */

var path = require('path');

var Cucumber  = require('cucumber');
var debug = require('debug');
var yargs = require('yargs');
var _ = require('lodash');

var rewire  = require('./rewire.js');
var pkg     = require('../../package.json');

var DEFAULT_CONFIG = exports.DEFAULT_CONFIG = {
  inject: true,
  command: [],
  require: [],
  tags: [],
  format: null,
  driver: {
    logLevel: 'silent',
    desiredCapabilities: {
      browserName: 'phantomjs'
    },
    port: 8910
  }
};

function flatMap(array, lambda) {
  return Array.prototype.concat.apply([], array.map(lambda));
}

function execOptSupport(requireArray) {
  var cukeArgs = ['node', 'node_modules/.bin/cucumber-js'].concat(flatMap(requireArray, function(item) {
    return ['-r', item];
  }));
  var parser = Cucumber.Cli.ArgumentParser(cukeArgs);
  parser.parse();

  return flatMap(parser.getSupportCodeFilePaths(), function(item) {
    return ['-r', item];
  });
}

function execOptTags(tagsArray) {
  return flatMap(tagsArray, function(item) {
    return ['-t', item];
  });
}

function execOptFormat(format) {
  return ['-f', format];
}

function execOptInjection(config) {
  var inject = require('./support/mink_inject.js');
  var injectPath = path.resolve(__dirname, './support/mink_inject.js');
  rewire(injectPath, inject(config));
  return ['-r', injectPath];
}

exports.process = function() {
  var config = DEFAULT_CONFIG;

  var argv = yargs.usage('Usage: cucumber-mink [options] [[FILE|DIR][:LINE]]+')
    .option('r', {
      alias: 'require',
      describe: 'See "$ cucumber-js --help"',
      type: 'string'
    })
    .option('t', {
      alias: 'tags',
      describe: 'See "$ cucumber-js --help"',
      type: 'string'
    })
    .option('f', {
      alias: 'format',
      describe: 'See "$ cucumber-js --help"',
      type: 'string'
    })
    .option('no-inject', {
      describe: 'Disable Mink auto-inject in Cucumber.js context',
      type: 'boolean'
    })
    .option('browser', {
      'default': 'phantomjs',
      describe: 'Desired browser name',
      type: 'string'
    })
    .option('port', {
      'default': 8910,
      describe: 'Selenium server port',
      type: 'number'
    })
    .option('wdio', {
      'default': 'silent',
      describe: 'WebDriverIO verbosity',
      type: 'string'
    })
    .option('debug', {
      describe: 'Run with debug logs',
      type: 'boolean'
    })
    .help('h')
    .alias('h', 'help')
    .version(pkg.version)
    .alias('v', 'version')
    .argv;

  if (argv.require) {
    config.require = _.isArray(argv.require)
      ? argv.require
      : [argv.require];
  }
  if (argv.tags) {
    config.tags = _.isArray(argv.tags)
      ? argv.tags
      : [argv.tags];
  }
  if (argv.format) {
    config.format = argv.format;
  }
  if (argv.noInject) {
    config.inject = false;
  }
  if (argv.browser) {
    config.driver.desiredCapabilities.browserName = argv.browser;
  }
  if (argv.port) {
    config.driver.port = argv.port;
  }
  if (argv.wdio) {
    config.driver.logLevel = argv.wdio;
  }
  if (argv.debug) {
    debug.enable('mink:*');
  }

  config.command = argv._;

  return config;
};

exports.cli = function() {
  var config = this.process();

  console.log(
    'Cucumber-mink v%s. Launching %s on port %s...',
    pkg.version,
    config.driver.desiredCapabilities.browserName,
    config.driver.port
  );

  this.run(config, function(error) {
    if (error) {
      process.stderr.write('Test suite failed !');
      process.exit(1);
    }
  });
};

exports.run = function(config, cb) {
  var execOptArray = [];
  execOptArray.push(['node', 'node_modules/.bin/cucumber-js']);

  if (config.inject) {
    execOptArray.push(execOptInjection(config));
  }
  execOptArray.push(execOptSupport(config.require));
  execOptArray.push(execOptTags(config.tags));
  if (config.format) {
    execOptArray.push(execOptFormat(config.format));
  }
  execOptArray.push(config.command);

  var execOptions = flatMap(execOptArray, _.identity);

  var debugCli = debug('mink:cli');
  debugCli('Configuration', config);
  debugCli('Cucumber.Cli', execOptions);

  Cucumber.Cli(execOptions).run(function(success) {
    cb(success ? null : new Error('Test failed'));
  });
};
