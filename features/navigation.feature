Feature: I can use cucumber.mink to navigate through my website

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Render Homepage and navigate
    Given I am on the homepage
    Then  the response status code should be 200
      And I should be on the homepage
      And I should be on "/"
      And the url should match ^\/
      And the response status code should not be 404

  Scenario: Render Home and reload
    Given I am on the homepage
    And   I reload the page
    Then  I should be on the homepage

  Scenario: Navigate backward
    Given I am on the homepage
    And   I follow "Post-1"
    Then  I should be on "/post/1"
      And the url should match ^\/post\/\d+
    Then  I move backward one page
    Then  I should be on the homepage

  Scenario: Render post detail
    Given I am on "/post/2"
    Then  the response status code should be 200
      And I should be on "/post/2"

  Scenario: Go to an 404 error page
    Given I go to "/any-random-error-page" and it should be an 404 error
