module.exports = function() {
  this.Given(/^I test step root/,   require('../../spec/steps/root.js'));
  this.Given(/^I test browse path/, require('../../spec/steps/root.js'));
};
