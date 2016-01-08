/* eslint no-console:0 */

import Cli from '../src/cli/cli.js';

// Execute from /test so that it auto-load from /test/features
process.chdir(__dirname);

function suite(browser, port, callback) {
  const config = Cli.DEFAULT_CONFIG;
  config.driver.desiredCapabilities.browserName = browser;
  config.driver.port = port;
  config.format = 'progress';

  Cli.run(config, callback);
}

process.stdout.write('\nFirefox: Complete suite.\n\n');
suite('firefox', 4444, () => {});
