/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var Ext = require('./ext');

///////////////////

function utility() {
  this.Given(/^I wait (\d+) seconds?$/,                                         Ext.Utility.wait);
  this.Given(/^the viewport is (\d+)px width and (\d+)px height$/,              Ext.Utility.viewport);
  this.Given(/^I take a screenshot$/,                                           Ext.Utility.takeScreenshot);
}

function navigation() {
  this.Given(/^I browse "([^"]*)"$/,                                            Ext.Navigation.baseUrl);
  this.When(/^I am on (?:|the )homepage$/,                                      Ext.Navigation.root);
  this.When(/^I go to (?:|the )homepage$/,                                      Ext.Navigation.root);
  this.When(/^I am on "([^"]*)"$/,                                              Ext.Navigation.browse);
  this.When(/^I go to "([^"]*)"$/,                                              Ext.Navigation.browse);
  this.When(/^I reload the page$/,                                              Ext.Navigation.refresh);
  this.When(/^I move backward one page$/,                                       Ext.Navigation.back);
}

function action() {
  this.When(/^I click on "([^"]*)"$/,                                           Ext.Action.click);
  this.When(/^I press "([^"]*)"$/,                                              Ext.Action.press);
  this.When(/^I follow "([^"]*)"$/,                                             Ext.Action.follow);
  this.When(/^I hover "([^"]*)" element$/,                                      Ext.Action.hover);
  this.When(/^I submit "([^"]*)" form$/,                                        Ext.Action.submit);
}

function form() {
  this.When(/^I fill in "([^"]*)" with "([^"]*)"$/,                             Ext.Form.fillField);
  this.When(/^I fill in "([^"]*)" with:$/,                                      Ext.Form.fillField);
  this.When(/^I fill in the following:$/,                                       Ext.Form.fillFieldsHash);
  this.When(/^I select "([^"]*)" from "([^"]*)"$/,                              Ext.Form.selectOption);
  this.When(/^I check "([^"]*)"$/,                                              Ext.Form.checkOption);
  this.When(/^I uncheck "([^"]*)"$/,                                            Ext.Form.uncheckOption);
}

function assertUrl() {
  this.Then(/^I should be on "([^"]*)"$/,                                       Ext.Assert.Url.equal);
  this.Then(/^I should be on (?:|the )homepage$/,                               Ext.Assert.Url.root);
  this.Then(/^the url should match (.+)$/,                                      Ext.Assert.Url.match);
  this.Then(/^the url parameter should match (.+)$/,                            Ext.Assert.Url.queryMatch);
}

function assertDom() {
  this.Then(/^I should see "([^"]*)"$/,                                         Ext.Assert.Dom.containsText);
  this.Then(/^I should not see "([^"]*)"$/,                                     Ext.Assert.Dom.notContainsText);
  this.Then(/^I should see text matching (.+)$/,                                Ext.Assert.Dom.matchesText);
  this.Then(/^I should not see text matching (.+)$/,                            Ext.Assert.Dom.notMatchesText);
  this.Then(/^I should see (\d+) "([^"]*)" elements?$/,                         Ext.Assert.Dom.elementsCount);
  this.Then(/^I should see "([^"]*)" in the "([^"]*)" element$/,                Ext.Assert.Dom.elementContainsText);
  this.Then(/^I should not see "([^"]*)" in the "([^"]*)" element$/,            Ext.Assert.Dom.elementNotContainsText);
  this.Then(/^I should see an? "([^"]*)" element$/,                             Ext.Assert.Dom.elementVisible);
  this.Then(/^I should not see an? "([^"]*)" element$/,                         Ext.Assert.Dom.elementNotVisible);
  this.Then(/^the "([^"]*)" element should be visible$/,                        Ext.Assert.Dom.elementVisible);
  this.Then(/^the "([^"]*)" element should not be visible$/,                    Ext.Assert.Dom.elementNotVisible);
  this.Then(/^the "([^"]*)" element should exist$/,                             Ext.Assert.Dom.elementExist);
  this.Then(/^the "([^"]*)" element should not exist$/,                         Ext.Assert.Dom.elementNotExist);
}

function assertForm() {
  this.Then(/^the "([^"]*)" current option contain "([^"]*)"$/,                 Ext.Assert.Form.selectContains);
  this.Then(/^the "([^"]*)" field should contain "([^"]*)"$/,                   Ext.Assert.Form.fieldContains);
  this.Then(/^the "([^"]*)" field should not contain "([^"]*)"$/,               Ext.Assert.Form.fieldNotContains);
  this.Then(/^the "([^"]*)" field should be enabled$/,                          Ext.Assert.Form.fieldEnabled);
  this.Then(/^the "([^"]*)" field should be disabled$/,                         Ext.Assert.Form.fieldDisabled);
  this.Then(/^the "([^"]*)" checkbox should be checked$/,                       Ext.Assert.Form.checkboxChecked);
  this.Then(/^the checkbox "([^"]*)" (?:is|should be) checked$/,                Ext.Assert.Form.checkboxChecked);
  this.Then(/^the "([^"]*)" checkbox should not be checked$/,                   Ext.Assert.Form.checkboxNotChecked);
  this.Then(/^the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/,  Ext.Assert.Form.checkboxNotChecked);
  this.Then(/^the checkbox "([^"]*)" is (?:unchecked|not checked)$/,            Ext.Assert.Form.checkboxNotChecked);
}

///////////////////

module.exports.register = function(Mink) {
  utility.call(Mink);
  navigation.call(Mink);
  action.call(Mink);
  form.call(Mink);
  assertUrl.call(Mink);
  assertDom.call(Mink);
  assertForm.call(Mink);
};
