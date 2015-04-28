module.exports = function() {
  this.Given(/^I test driver button/,           require('../../spec/driver/button.js'));
  this.Given(/^I test driver click/,            require('../../spec/driver/click.js'));
  this.Given(/^I test driver link/,             require('../../spec/driver/link.js'));
  this.Given(/^I test driver saveScreenshot$/,  require('../../spec/driver/saveScreenshot.js'));
};
