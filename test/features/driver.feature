Feature: Driver tests

  Background:
    Given I browse "http://localhost:3000/"
    And I am on the homepage

  Scenario:
    * I test driver button
    * I test driver click
    * I test driver link
    * I test driver saveScreenshot
