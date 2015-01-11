var Cucumber = require('cucumber');

function runWith(file) {
  return Cucumber.Cli([
      'node', 'cucumber-js',
      '--require', file,
      '--require', 'test/features/step_definitions/',
      'test/features/'
    ]
  );
}

// Phantomjs Run
console.log('Running Test suite with WebDriverIO');
runWith('examples/phantomjs.js').run(function (succeeded) {
  process.exit(succeeded ? 0 : 1);
});
