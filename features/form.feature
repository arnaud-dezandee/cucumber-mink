Feature: I can use cucumber.mink to fill in forms

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: I can check a checkbox
    Given I am on "/form"
    Then I should see "Form Page"
    Then the "#cb" checkbox should not be checked
    Then I check "#cb"
    Then the "#cb" checkbox should be checked

  Scenario Outline: Multiple form submit
    Given I am on "/form"
    When I fill in the following:
      | first_name  | <first_name> |
      | last_name   | <last_name> |
      | description | <description> |

    And I select "<country>" from "country"
    And I <cbState> "#cb"
    And I press "Register"

    Then I should be on "/result"
      And I should see "<first_name>" in the "p.first-name" element
      And I should see "<last_name>" in the "p.last-name" element
      And I should see "<description>" in the "p.description" element
      And I should see "<countryVal>" in the "p.country" element
      And I should see "<cbBool>" in the "p.cb" element

  Examples:
    | first_name | last_name | description | country | countryVal | cbState | cbBool |
    | fn1        | ln1       | d1          | France  | 0          | check   | true   |
    | fn2        | ln2       | d2          | Italy   | 1          | uncheck | false  |
    | fn3        | ln3       | d3          | USA     | 2          | uncheck | false  |
