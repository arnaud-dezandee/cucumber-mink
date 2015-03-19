/* eslint no-console:0 */

var Cucumber  = require('cucumber'),
    async     = require('async');

function suite(file, features, callback) {
  Cucumber.Cli([
      'node', 'cucumber-js',
      '--require', file || 'test/features/support',
      '--require', 'test/features/step_definitions/',
      features || 'test/features/'
  ]).run(function(success) {
    if (!success) { throw new Error('Test suite failed !'); }
    callback(null, success);
  });
}

async.series([
  function(cb) {
    console.log('\nPhantomJS: Backward mink.call');
    suite('test/features/support', 'test/features/action.feature', cb);
  },
  function(cb) {
    console.log('\nPhantomJS: Complete suite with phantomjs configuration example');
    suite('examples/phantomjs.js', 'test/features/', cb);
  }
]);
