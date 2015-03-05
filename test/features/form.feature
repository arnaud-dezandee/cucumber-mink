Feature: I can use cucumber.mink to fill in forms

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: I can check a checkbox
    Given I am on "/form"
    Then I should see "Form Page"
    Then the "#cb" checkbox should not be checked
    Then I check "#cb"
    Then the "#cb" checkbox should be checked
    Then I uncheck "#cb"
    Then the "#cb" checkbox should not be checked

  Scenario Outline: Multiple form submit
    Given I am on "/form"

    Then the "input[name='first_name']" field should be enabled
    Then the "input[name='disabled_input']" field should be disabled

    When I fill in "input[name='first_name']" with "<first_name>"
    And  I fill in the following:
      | input[name='last_name']   | <last_name> |
      | textarea[name='description'] | <description> |

    And I select "<country>" from "select[name='country']"
      Then the "select[name='country']" current option contain "<country>"

    And I <cbState> "#cb"
      Then the "input[name='first_name']" field should contain "<first_name>"
      Then the "input[name='first_name']" field should not contain "<last_name>"
    And I press "button[type='submit']"

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

  Scenario: I submit the form with one metaStep
    Given I submit the form
    Then I should be on "/result"
      And I should see "fn2" in the "p.first-name" element
      And I should see "ln2" in the "p.last-name" element
      And I should see "d2" in the "p.description" element

  Scenario Outline: Submit action shortcut
    Given I am on "/form"
    And   I submit "<selector>" form
    Then  I should be on "/result"

  Examples:
    | selector |
    | #register-form |
    | input[name='first_name'] |
    | select[name='country'] |
