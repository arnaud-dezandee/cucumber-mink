const { defineSupportCode } = require('cucumber');
const Mink = require('cucumber-mink');

// Local Firefox
const parameters = {
  driver: {
    logLevel: 'silent',
    desiredCapabilities: {
      browserName: 'firefox',
    },
    port: 4444,
  },
};

defineSupportCode((cucumber) => {
  Mink.configure(parameters);
  Mink.init(cucumber);
});
