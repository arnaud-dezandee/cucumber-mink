const { defineSupportCode } = require('cucumber');
const Mink = require('cucumber-mink');

// Local Chrome
const parameters = {
  driver: {
    logLevel: 'silent',
    desiredCapabilities: {
      browserName: 'chrome',
    },
    port: 9515,
  },
};

defineSupportCode((cucumber) => {
  Mink.configure(parameters);
  Mink.init(cucumber);
});
