Feature: I can use cucumber.mink to test cookies

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Cookie does not exist
    Given I am on "/"
    Then a cookie "tcookie" does not exist

  Scenario: Cookie exists
    Given I am on "/cookie/tcookie/abc123"
    Then a cookie "tcookie" exists
    And cookie "tcookie" has value "abc123"
