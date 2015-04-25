/* eslint no-console:0 */

var Cucumber  = require('cucumber'),
    async     = require('async');

function suite(features, callback) {
  Cucumber.Cli([
      'node', 'cucumber-js',
      '--require', 'test/features/support',
      '--require', 'test/features/step_definitions/',
      features || 'test/features/'
  ]).run(function(success) {
    if (!success) { throw new Error('Test suite failed !'); }
    callback(null, success);
  });
}

async.series([
  function(cb) {
    console.log('\nPhantomJS: Complete suite');
    suite('test/features/', cb);
  }
]);
