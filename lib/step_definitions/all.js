var Ext = require('./ext');

///////////////////

function deprecated() {
  console.log('Deprecated, please remove !');
  arguments[arguments.length - 1]();
}

///////////////////

module.exports = function() {
  this.Given(/^I browse "([^"]*)"$/,                    Ext.Utility.baseUrl);
  this.Given(/^I wait (\d+) seconds?$/,                 Ext.Utility.wait);

  this.When(/^I am on (?:|the )homepage$/,              Ext.Navigation.root);
  this.When(/^I go to (?:|the )homepage$/,              Ext.Navigation.root);
  this.When(/^I am on "([^"]*)"$/,                      Ext.Navigation.browse);
  this.When(/^I go to "([^"]*)"$/,                      Ext.Navigation.browse);
  this.When(/^I reload the page$/,                      Ext.Navigation.reload);
  this.When(/^I move backward one page$/,               Ext.Navigation.back);

  this.When(/^I click on "([^"]*)"$/,                   Ext.Action.click);
  this.When(/^I press "([^"]*)"$/,                      Ext.Action.click);
  this.When(/^I follow "([^"]*)"$/,                     Ext.Action.click);

  this.Then(/^I should be on "([^"]*)"$/,               Ext.Assert.Url.equal);
  this.Then(/^I should be on (?:|the )homepage$/,       Ext.Assert.Url.root);
  this.Then(/^the url should match (.+)$/,              Ext.Assert.Url.match);
  this.Then(/^the url parameter should match (.+)$/,    Ext.Assert.Url.queryMatch);

  this.When(/^I fill in "([^"]*)" with "([^"]*)"$/,     Ext.Form.fillField);
  this.When(/^I fill in "([^"]*)" with:$/,              Ext.Form.fillField);
  this.When(/^I fill in the following:$/,               Ext.Form.fillFieldsHashDataTable);
  this.When(/^I select "([^"]*)" from "([^"]*)"$/,      Ext.Form.selectOption);
  this.When(/^I check "([^"]*)"$/,                      Ext.Form.checkOption);
  this.When(/^I uncheck "([^"]*)"$/,                    Ext.Form.uncheckOption);

  this.Then(/^I should see "([^"]*)"$/,                                         Ext.Assert.Dom.containsText);
  this.Then(/^I should not see "([^"]*)"$/,                                     Ext.Assert.Dom.notContainsText);
  this.Then(/^I should see text matching (.+)$/,                                Ext.Assert.Dom.matchesText);
  this.Then(/^I should not see text matching (.+)$/,                            Ext.Assert.Dom.notMatchesText);
  this.Then(/^I should see (\d+) "([^"]*)" elements?$/,                         Ext.Assert.Dom.elementCount);
  this.Then(/^I should see "([^"]*)" in the "([^"]*)" element$/,                Ext.Assert.Dom.elementContainsText);
  this.Then(/^I should not see "([^"]*)" in the "([^"]*)" element$/,            Ext.Assert.Dom.elementNotContainsText);
  this.Then(/^I should see an? "([^"]*)" element$/,                             Ext.Assert.Dom.elementOnPage);
  this.Then(/^I should not see an? "([^"]*)" element$/,                         Ext.Assert.Dom.elementNotOnPage);

  this.Then(/^the "([^"]*)" field should contain "([^"]*)"$/,                   Ext.Assert.Form.fieldContains);
  this.Then(/^the "([^"]*)" field should not contain "([^"]*)"$/,               Ext.Assert.Form.fieldNotContains);
  this.Then(/^the "([^"]*)" checkbox should be checked$/,                       Ext.Assert.Form.checkboxChecked);
  this.Then(/^the checkbox "([^"]*)" (?:is|should be) checked$/,                Ext.Assert.Form.checkboxChecked);
  this.Then(/^the "([^"]*)" checkbox should not be checked$/,                   Ext.Assert.Form.checkboxNotChecked);
  this.Then(/^the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/,  Ext.Assert.Form.checkboxNotChecked);
  this.Then(/^the checkbox "([^"]*)" is (?:unchecked|not checked)$/,            Ext.Assert.Form.checkboxNotChecked);

  this.Then(/^the response status code should be (\d+)$/,       deprecated);
  this.Then(/^the response status code should not be (\d+)$/,   deprecated);
};
