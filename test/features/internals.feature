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

  Scenario: Meta-builder failing step
    Given a failing meta-builder steps

  Scenario: Click method with wrong arguments
    Given test click wrong arguments
