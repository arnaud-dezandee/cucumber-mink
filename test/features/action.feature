Feature: I can test cucumber-mink simulated action features

  Background:
    Given I browse "http://localhost:3000/"
    And I am on "/action"

  Scenario: Hover
    Then the ".hover-test .one" element should be visible
    And  the ".hover-test .two" element should not be visible
    When I hover ".hover-test" element
    Then the ".hover-test .one" element should not be visible
    And  the ".hover-test .two" element should be visible
