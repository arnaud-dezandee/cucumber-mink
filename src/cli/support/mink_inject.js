const { defineSupportCode } = require('cucumber');

defineSupportCode((cucumber) => {
  const Mink = require('../../mink.js');
  Mink.init(cucumber);
});
