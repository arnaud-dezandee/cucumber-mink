var path = require('path');

var debug = require('debug');
var yargs = require('yargs');
var Cucumber  = require('cucumber');
var _ = require('lodash');

var rewire  = require('./rewire.js');
var pkg     = require('../../package.json');

function cucumberJsArgv(minkArgv) {
  return minkArgv
    .concat(supportMinkInjection())
    .concat(supportCodeArgv(minkArgv));
}

function supportCodeArgv(minkArgv) {
  var parser = Cucumber.Cli.ArgumentParser(minkArgv);
  parser.parse();

  return _.chain(parser.getSupportCodeFilePaths())
    .map(function(sfp) {
      return ['--require', sfp];
    })
    .flatten()
    .value();
}

function supportMinkInjection() {
  var inject = require('./support/mink_inject.js');
  var injectPath = path.resolve(__dirname, './support/mink_inject.js');
  var parameters = {
    driver: {
      logLevel: 'silent',
      desiredCapabilities: {
        browserName: 'chrome'
      },
      port: 4444
    }
  };
  rewire(injectPath, inject(parameters));
  return ['--require', injectPath];
}

exports.process = function() {
  var argv = yargs
    .usage('Usage: cucumber-mink [options] [[FILE|DIR][:LINE]]+')
    .help('h')
    .alias('h', 'help')
    .version(pkg.version)
    .alias('v', 'version')
    .option('d', {
      alias: 'debug',
      describe: 'Run with debug logs',
      type: 'boolean'
    })
    .argv;

  if (argv.debug) {
    debug.enable('mink:*');
  }
};

exports.run = function() {
  exports.process();

  Cucumber.Cli(cucumberJsArgv(process.argv)).run(function(success) {
    if (!success) {
      process.stderr.write('Test suite failed !');
      process.exit(1);
    }
  });
};
