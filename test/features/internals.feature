Feature: I can test cucumber-mink internal features

  Background:
    Given I browse "http://localhost:3000/"
      And I am on the homepage

  Scenario:
    Given  I take a screenshot
      Then a file should exist at "./screenshot.png"

  Scenario:
    Then test driver non-existing button
    Then test mink non-existing button
    Then test driver non-existing link
    Then test mink non-existing link

  Scenario: No base url
    Given there is no base url
    And   test browse homepage

  Scenario: Click method with wrong arguments
    Given test click wrong arguments

  Scenario: Tests
    * I call findStep with missing step
    * I call metaStep with failing step
    * I call manyStep with an array of steps

  Scenario: Nav.partial
    * I load "nav.partial" file
    * I execute nav.partial scenario
