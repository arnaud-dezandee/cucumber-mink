const { defineSupportCode } = require('cucumber');
const Mink = require('cucumber-mink');

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

defineSupportCode((cucumber) => {
  Mink.configure(parameters);
  Mink.init(cucumber);
});
