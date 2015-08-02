Feature: I can use cucumber.mink to send key press to an element

  Background:
    Given I browse "http://localhost:3000/"
    And I am on "/keys"

  Scenario Outline: Send key
    When I send key "<key>" in "#keys" element
    Then I should see "<result>" in the "#result" element

  Examples:
    | key      | result |
    | Enter    | 13     |
    | Up arrow | 38     |
    | Tab      | 9      |
    | F1       | 112    |
    | a        | 65     |
