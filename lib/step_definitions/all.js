var Mink = require('./ext');

module.exports = function() {
  // this.Given === this.Then === this.When === this.defineStep

  this.Given(/^I browse "([^"]*)"$/,               Mink.Utility.baseUrl);
  this.Given(/^I wait (\d+) seconds?$/,            Mink.Utility.wait);

  this.When(/^I am on (?:|the )homepage$/,         Mink.Navigation.root);
  this.When(/^I go to (?:|the )homepage$/,         Mink.Navigation.root);
  this.When(/^I am on "([^"]*)"$/,                 Mink.Navigation.browse);
  this.When(/^I go to "([^"]*)"$/,                 Mink.Navigation.browse);
  this.When(/^I reload the page$/,                 Mink.Navigation.reload);
  this.When(/^I move backward one page$/,          Mink.Navigation.back);

  this.When(/^I click on "([^"]*)"$/,              Mink.Action.click);
  this.When(/^I press "([^"]*)"$/,                 Mink.Action.click);
  this.When(/^I follow "([^"]*)"$/,                Mink.Action.click);

  this.Then(/^I should be on "([^"]*)"$/,               Mink.Assert.Url.equal);
  this.Then(/^I should be on (?:|the )homepage$/,       Mink.Assert.Url.root);
  this.Then(/^the url should match (.+)$/,              Mink.Assert.Url.match);
  this.Then(/^the url parameter should match (.+)$/,    Mink.Assert.Url.queryMatch);

  this.When(/^I fill in "([^"]*)" with "([^"]*)"$/,     Mink.Form.fillField);
  this.When(/^I fill in "([^"]*)" with:$/,              Mink.Form.fillField);
  this.When(/^I fill in the following:$/,               Mink.Form.fillFieldsHashDataTable);
  this.When(/^I select "([^"]*)" from "([^"]*)"$/,      Mink.Form.selectOption);
  this.When(/^I check "([^"]*)"$/,                      Mink.Form.checkOption);
  this.When(/^I uncheck "([^"]*)"$/,                    Mink.Form.uncheckOption);

  this.Then(/^I should see "([^"]*)"$/,                                    Mink.Assert.Dom.containsText);
  this.Then(/^I should not see "([^"]*)"$/,                                Mink.Assert.Dom.notContainsText);
  this.Then(/^I should see text matching (.+)$/,                           Mink.Assert.Dom.matchesText);
  this.Then(/^I should not see text matching (.+)$/,                       Mink.Assert.Dom.notMatchesText);
  this.Then(/^I should see (\d+) "([^"]*)" elements?$/,                    Mink.Assert.Dom.elementCount);
  this.Then(/^I should see "([^"]*)" in the "([^"]*)" element$/,           Mink.Assert.Dom.elementContainsText);
  this.Then(/^I should not see "([^"]*)" in the "([^"]*)" element$/,       Mink.Assert.Dom.elementNotContainsText);
  this.Then(/^I should see an? "([^"]*)" element$/,                        Mink.Assert.Dom.elementOnPage);
  this.Then(/^I should not see an? "([^"]*)" element$/,                    Mink.Assert.Dom.elementNotOnPage);

  this.Then(/^the "([^"]*)" field should contain "([^"]*)"$/,                   Mink.Assert.Form.fieldContains);
  this.Then(/^the "([^"]*)" field should not contain "([^"]*)"$/,               Mink.Assert.Form.fieldNotContains);
  this.Then(/^the "([^"]*)" checkbox should be checked$/,                       Mink.Assert.Form.checkboxChecked);
  this.Then(/^the checkbox "([^"]*)" (?:is|should be) checked$/,                Mink.Assert.Form.checkboxChecked);
  this.Then(/^the "([^"]*)" checkbox should not be checked$/,                   Mink.Assert.Form.checkboxNotChecked);
  this.Then(/^the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/,  Mink.Assert.Form.checkboxNotChecked);
  this.Then(/^the checkbox "([^"]*)" is (?:unchecked|not checked)$/,            Mink.Assert.Form.checkboxNotChecked);

  this.Then(/^the response status code should be (\d+)$/,       deprecated);
  this.Then(/^the response status code should not be (\d+)$/,   deprecated);

};

function deprecated() {
  console.log('Deprecated, please remove !');
  arguments[arguments.length - 1]();
}
