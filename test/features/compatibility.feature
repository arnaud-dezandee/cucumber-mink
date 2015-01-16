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
