const { defineSupportCode } = require('cucumber');

defineSupportCode((cucumber) => {
  const Mink = require('../../../src/mink.js');
  Mink.configure({
    driver: { protractor: true },
  });
  Mink.init(cucumber);
});
