import Mink from '../src/mink.js';

// Phantomjs - GhostDriver
const parameters = {
  driver: {
    screenshotPath: 'test/',
    desiredCapabilities: {
      browserName: 'phantomjs',
    },
    logLevel: 'silent',
    port: 8910,
  },
};

export default function () {
  Mink.init(this, parameters);
}
