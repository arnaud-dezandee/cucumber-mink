Feature: I can use cucumber.mink to check the content of my website

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Check Homepage content
    Given I am on the homepage
    Then I should see "Home Page"
      And I should not see "Post Detail Page"
      And I should see text matching Post-\d+
      And I should not see text matching .+@.+
      And I should see "Home Page" in the "h1" element
      And I should not see "Post Detail Page" in the "h1" element
      And I should see an "h2.content-subhead" element
      And the "p.description" element should not exist
      And I should see 3 "section.post" elements

  Scenario Outline: Check Generated content
    Given I am on "<path>"
    Then I should see <count> "section.post" elements

  Examples:
    | path         | count |
    | /generate/7  | 7     |
    | /generate/30 | 30    |

  # Internals specs
  Scenario:
    * I test step assert dom html
