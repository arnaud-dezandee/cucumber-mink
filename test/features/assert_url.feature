Feature: I can use cucumber.mink to navigate through my website

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Assert url
    Given I am on "/post/2"
    Then  I should be on "/post/2"

  Scenario: Assert url with query
    Given I am on "/post/2?search=foo"
    Then  I should be on "/post/2?search=foo"

  Scenario: Url matching
    Given I am on "/post/2?search=foo"
    Then  the url should match post.\d

  Scenario: Url pattern matching
    Given I am on "/post/2?search=foo"
    Then  the url parameter should match search=fo+
