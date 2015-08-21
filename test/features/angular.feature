Feature: I can use cucumber.mink to test an Angular.js app

  Background:
    Given I browse "http://localhost:3000/"
    And I am on "/angular"

  Scenario: Click button make a $http call
    Then I should see 2 "li" element

    When I press "Click me"
    And I wait for Angular app "html"
    Then I should see 3 "li" element
    And I should see "OK !"
