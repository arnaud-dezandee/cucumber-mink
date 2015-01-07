Feature: I can use cucumber.mink to navigate through my website

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Render Homepage and navigate
    Given I am on the homepage
    Then  I should be on the homepage
      And I should be on "/"
      And the url should match ^\/

  Scenario: Render Home and reload
    Given I am on the homepage
    And   I reload the page
    Then  I should be on the homepage

  Scenario: Navigate backward
    Given I am on the homepage
    And   I follow "h2.post-title a"
    Then  I wait 1 second
    Then  I should be on "/post/1"
      And the url should match ^\/post\/\d+
    Then  I move backward one page
    Then  I should be on the homepage

  Scenario: Render post detail
    Given I am on "/post/2"
    Then  I should be on "/post/2"
