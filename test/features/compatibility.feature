Feature: Driver compatibilities

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Link
    Given I am on homepage
      And I follow "Post-1"
    Then I should be on "/post/1"
      And I should see "Post-1"

    Given I am on homepage
      And I follow "a[href='/post/1']"
    Then I should be on "/post/1"
      And I should see "Post-1"

    Given I am on homepage
      And I follow "Follow me to form !"
    Then I should be on "/form"
      And I should see "Form Page"

  Scenario: Press
    Given I am on "/form"
      And I press "Button-Register"
    Then I should be on "/result"

    Given I am on "/form"
      And I press "Input-Register"
    Then I should be on "/result"

    Given I am on "/form"
      And I press "button.pure-button"
    Then I should be on "/result"

    Given I am on "/form"
      And I press "Weird button '-' text"
    Then I should be on "/result"
