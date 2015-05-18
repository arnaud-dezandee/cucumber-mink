module.exports = function() {
  this.Given(/^I test method findStep/, require('../../spec/methods/findStep.js'));
  this.Given(/^I test method manyStep/, require('../../spec/methods/manyStep.js'));
  this.Given(/^I test method metaStep/, require('../../spec/methods/metaStep.js'));
};
