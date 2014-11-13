var mink = require('./mink');

module.exports = function() {
  // this.Given === this.Then === this.When === this.defineStep

  this.Given(/^(?:|I )browse "([^"]*)"$/, mink.setBaseUrl);

  this.When(/^(?:|I )am on (?:|the )homepage$/, mink.iAmOnHomepage);
  this.When(/^(?:|I )go to (?:|the )homepage$/, mink.iAmOnHomepage);

  this.When(/^(?:|I )am on "([^"]*)"$/, mink.visit);
  this.When(/^(?:|I )go to "([^"]*)"$/, mink.visit);

  this.When(/^(?:|I )am on "([^"]*)" and it should be an (\d+) error$/, mink.visitWithError);
  this.When(/^(?:|I )go to "([^"]*)" and it should be an (\d+) error$/, mink.visitWithError);

  this.When(/^(?:|I )reload the page$/, mink.reload);
  this.When(/^(?:|I )move backward one page$/, mink.back);

  this.When(/^(?:|I )press "([^"]*)"$/, mink.pressButton);
  this.When(/^(?:|I )follow "([^"]*)"$/, mink.clickLink);

  this.When(/^(?:|I )fill in "([^"]*)" with "([^"]*)"$/, mink.fillField);
  this.When(/^(?:|I )fill in "([^"]*)" with:$/, mink.fillField);
  this.When(/^(?:|I )fill in the following:$/, mink.fillFieldsHashDataTable);

  this.When(/^(?:|I )select "([^"]*)" from "([^"]*)"$/, mink.selectOption);
  this.When(/^(?:|I )check "([^"]*)"$/, mink.checkOption);
  this.When(/^(?:|I )uncheck "([^"]*)"$/, mink.uncheckOption);

  this.Then(/^(?:|I )should be on "([^"]*)"$/, mink.assertPageAddress);
  this.Then(/^(?:|I )should be on (?:|the )homepage$/, mink.assertHomepage);
  this.Then(/^the url should match (.+)$/, mink.assertUrlRegExp);

  this.Then(/^the response status code should be (\d+)$/, mink.assertResponseStatus);
  this.Then(/^the response status code should not be (\d+)$/, mink.assertResponseStatusIsNot);

  this.Then(/^(?:|I )should see "([^"]*)"$/, mink.assertPageContainsText);
  this.Then(/^(?:|I )should not see "([^"]*)"$/, mink.assertPageNotContainsText);
  this.Then(/^(?:|I )should see text matching (.+)$/, mink.assertPageMatchesText);
  this.Then(/^(?:|I )should not see text matching (.+)$/, mink.assertPageNotMatchesText);

  this.Then(/^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/, mink.assertElementContainsText);
  this.Then(/^(?:|I )should not see "([^"]*)" in the "([^"]*)" element$/, mink.assertElementNotContainsText);

  this.Then(/^(?:|I )should see an? "([^"]*)" element$/, mink.assertElementOnPage);
  this.Then(/^(?:|I )should not see an? "([^"]*)" element$/, mink.assertElementNotOnPage);

  this.Then(/^the "([^"]*)" field should contain "([^"]*)"$/, mink.assertFieldContains);
  this.Then(/^the "([^"]*)" field should not contain "([^"]*)"$/, mink.assertFieldNotContains);

  this.Then(/^the "([^"]*)" checkbox should be checked$/, mink.assertCheckboxChecked);
  this.Then(/^the checkbox "([^"]*)" (?:is|should be) checked$/, mink.assertCheckboxChecked);

  this.Then(/^the "([^"]*)" checkbox should not be checked$/, mink.assertCheckboxNotChecked);
  this.Then(/^the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/, mink.assertCheckboxNotChecked);
  this.Then(/^the checkbox "([^"]*)" is (?:unchecked|not checked)$/, mink.assertCheckboxNotChecked);

  this.Then(/^(?:|I )should see (\d+) "([^"]*)" elements?$/, mink.assertNumElements);
  this.When(/^(?:|I )click on "([^"]*)"$/, mink.click);

  this.Then(/^(?:|I )wait (\d+) seconds?$/, mink.wait);

};
