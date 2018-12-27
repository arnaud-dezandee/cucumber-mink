Feature: I can test abstracted selectors with cucumber-mink

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Abstracted selectors for blog posts
    Given I am on the homepage
    Then I should see 3 "Blogpost Teaser" elements
