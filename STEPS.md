#Available steps

Steps are defined by a regular expression usable inside .features files.

# Navigation

####/^(?:|I )browse "([^"]*)"$/

Useful to use short url in subsequent navigation (ex: "/login")

    Background:
        Given I browse "http://localhost:3000/"

---

####/^(?:|I )am on (?:|the )homepage$/
###### /^(?:|I )go to (?:|the )homepage$/

    Given I am on the homepage
    Given I go to the homepage

---

####/^(?:|I )am on "([^"]*)"$/
###### /^(?:|I )go to "([^"]*)"$/

    Given I am on "/post/2"
    Given I go to "/form"

---

####/^(?:|I )reload the page$/

    And I reload the page

---

####/^(?:|I )move backward one page$/

    Then I move backward one page

---

####/^(?:|I )press "([^"]*)"$/

    And I press "Register"

---

####/^(?:|I )follow "([^"]*)"$/

    And I follow "Link to your awesome FAQ"

---

# Form manipulation

####/^(?:|I )fill in "([^"]*)" with "([^"]*)"$/
###### /^(?:|I )fill in "([^"]*)" with:$/

    Then I fill in "first_name" with "My text"
    Then I fill in "first_name" with:
      """
      My long multi-line text ...
      """

---

####/^(?:|I )fill in the following:$/

    When I fill in the following:
      | first_name  | John          |
      | last_name   | Doe           |
      | description | Some text ... |

---

####/^(?:|I )select "([^"]*)" from "([^"]*)"$/

Select an option from a <select> input.

    And I select "France" from "country"

---

####/^(?:|I )check "([^"]*)"$/
###### /^(?:|I )uncheck "([^"]*)"$/

    Then I check "#checkbox-input"

---

# Content check Assertion

####/^(?:|I )should be on "([^"]*)"$/
###### /^(?:|I )should be on (?:|the )homepage$/

    Then I should be on "/post/1"

---

####/^the url should match (.+)$/

    And the url should match ^\/post\/\d+

---

####/^(?:|I )should see "([^"]*)"$/
###### (/^(?:|I )should not see "([^"]*)"$/

    Then I should see "Home Page"
    And I should not see "Post Detail Page"

---

####/^(?:|I )should see text matching (.+)$/
###### /^(?:|I )should not see text matching (.+)$/

    And I should see text matching Post-\d+
    And I should not see text matching .+@.+

---

####/^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/
###### /^(?:|I )should not see "([^"]*)" in the "([^"]*)" element$/

    And I should see "Home Page" in the "h1" element
    And I should not see "Post Detail Page" in the "h1" element

---

####/^(?:|I )should see an? "([^"]*)" element$/
###### /^(?:|I )should not see an? "([^"]*)" element$/

    And I should see an "h2.content-subhead" element
    And I should not see an "p.description" element

---

####/^the "([^"]*)" field should contain "([^"]*)"$/
###### /^the "([^"]*)" field should not contain "([^"]*)"$/

    Then the "description" field should contain "My long multi-line text ..."
    Then the "description" field should not contain "My first name"

---

####/^the "([^"]*)" checkbox should be checked$/
###### /^the checkbox "([^"]*)" (?:is|should be) checked$/

    Then the "#checkbox-input" checkbox should be checked

---

####/^the "([^"]*)" checkbox should not be checked$/
###### /^the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/
###### /^the checkbox "([^"]*)" is (?:unchecked|not checked)$/

    Then the "#checkbox-input" checkbox should not be checked

---

####/^(?:|I )should see (\d+) "([^"]*)" elements?$/

    And I should see 3 "section.post" elements

---

####/^(?:|I )click on "([^"]*)"$/

    Given I click on "button.showModal"
