/* eslint no-console:0 */
var path = require('path');

var Cucumber  = require('cucumber'),
    async     = require('async');

function suite(minkInit, callback) {
  if (!callback && typeof minkInit === 'function') {
    callback = minkInit;
    minkInit = null;
  }

  Cucumber.Cli([
    'node', 'cucumber-js',
    '--require', minkInit || 'test/features/support',
    '--require', 'test/features/step_definitions/',
    '--format', 'progress',
    'test/features/'
  ]).run(function(success) {
    if (!success) { throw new Error('Test suite failed !'); }
    callback(null, success);
  });
}

async.series([
  function(cb) {
    process.stdout.write('\nPhantomJS: Complete suite.\n\n');
    suite(cb);
  },
  function(cb) {
    process.stdout.write('\nFirefox: Complete suite.\n\n');
    suite(path.join(__dirname, '../examples/local-firefox.js'), cb);
  }
]);
