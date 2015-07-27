module.exports = function() {
  this.Given(/^I test step navigation base url/, require('../../spec/step/navigation/base_url.js'));
  this.Given(/^I test step navigation root/,   require('../../spec/step/navigation/root.js'));
};
