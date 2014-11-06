var mink = require('./mink');

module.exports = function() {

  this.defineStep(/^(?:|I )browse "([^"]*)"$/, mink.setBaseUrl);

  this.defineStep(/^(?:|I )am on (?:|the )homepage$/, mink.iAmOnHomepage);
  this.defineStep(/^(?:|I )go to (?:|the )homepage$/, mink.iAmOnHomepage);

  this.defineStep(/^(?:|I )am on "([^"]*)"$/, mink.visit);
  this.defineStep(/^(?:|I )go to "([^"]*)"$/, mink.visit);

  this.defineStep(/^(?:|I )am on "([^"]*)" and it should be an (\d+) error$/, mink.visitWithError);
  this.defineStep(/^(?:|I )go to "([^"]*)" and it should be an (\d+) error$/, mink.visitWithError);

  this.defineStep(/^(?:|I )reload the page$/, mink.reload);
  this.defineStep(/^(?:|I )move backward one page$/, mink.back);

  this.defineStep(/^(?:|I )press "([^"]*)"$/, mink.pressButton);
  this.defineStep(/^(?:|I )follow "([^"]*)"$/, mink.clickLink);

  this.defineStep(/^(?:|I )fill in "([^"]*)" with "([^"]*)"$/, mink.fillField);
  this.defineStep(/^(?:|I )fill in "([^"]*)" with:$/, mink.fillField);
  this.defineStep(/^(?:|I )fill in the following:$/, mink.fillFields);

  this.defineStep(/^(?:|I )select "([^"]*)" from "([^"]*)"$/, mink.selectOption);
  this.defineStep(/^(?:|I )check "([^"]*)"$/, mink.checkOption);
  this.defineStep(/^(?:|I )uncheck "([^"]*)"$/, mink.uncheckOption);

  this.defineStep(/^(?:|I )should be on "([^"]*)"$/, mink.assertPageAddress);
  this.defineStep(/^(?:|I )should be on (?:|the )homepage$/, mink.assertHomepage);
  this.defineStep(/^the url should match (.+)$/, mink.assertUrlRegExp);

  this.defineStep(/^the response status code should be (\d+)$/, mink.assertResponseStatus);
  this.defineStep(/^the response status code should not be (\d+)$/, mink.assertResponseStatusIsNot);

  this.defineStep(/^(?:|I )should see "([^"]*)"$/, mink.assertPageContainsText);
  this.defineStep(/^(?:|I )should not see "([^"]*)"$/, mink.assertPageNotContainsText);
  this.defineStep(/^(?:|I )should see text matching (.+)$/, mink.assertPageMatchesText);
  this.defineStep(/^(?:|I )should not see text matching (.+)$/, mink.assertPageNotMatchesText);

  this.defineStep(/^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/, mink.assertElementContainsText);
  this.defineStep(/^(?:|I )should not see "([^"]*)" in the "([^"]*)" element$/, mink.assertElementNotContainsText);

  this.defineStep(/^(?:|I )should see an? "([^"]*)" element$/, mink.assertElementOnPage);
  this.defineStep(/^(?:|I )should not see an? "([^"]*)" element$/, mink.assertElementNotOnPage);

  this.defineStep(/^the "([^"]*)" field should contain "([^"]*)"$/, mink.assertFieldContains);
  this.defineStep(/^the "([^"]*)" field should not contain "([^"]*)"$/, mink.assertFieldNotContains);

  this.defineStep(/^the "([^"]*)" checkbox should be checked$/, mink.assertCheckboxChecked);
  this.defineStep(/^the checkbox "([^"]*)" (?:is|should be) checked$/, mink.assertCheckboxChecked);

  this.defineStep(/^the "([^"]*)" checkbox should not be checked$/, mink.assertCheckboxNotChecked);
  this.defineStep(/^the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/, mink.assertCheckboxNotChecked);
  this.defineStep(/^the checkbox "([^"]*)" is (?:unchecked|not checked)$/, mink.assertCheckboxNotChecked);

  this.defineStep(/^(?:|I )should see (\d+) "([^"]*)" elements?$/, mink.assertNumElements);
  this.defineStep(/^(?:|I )click on "([^"]*)"$/, mink.click);

  this.defineStep(/^(?:|I )wait (\d+) seconds?$/, mink.wait);

};
