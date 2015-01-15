Feature: I can use cucumber.mink to test responsiveness of a web page

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Render in desktop and mobile
    Given I am on "/responsive"
      And the viewport is 320px width and 568px height
      Then the "p.large" element should not be visible
      Then the "p.medium" element should not be visible
      Then the "p.small" element should not be visible

    Given the viewport is 800px width and 800px height
      Then the "p.large" element should not be visible
      Then the "p.medium" element should not be visible
      Then the "p.small" element should be visible

    Given the viewport is 1100px width and 800px height
      Then the "p.large" element should not be visible
      Then the "p.medium" element should be visible
      Then the "p.small" element should be visible

    Given the viewport is 1300px width and 800px height
      Then the "p.large" element should be visible
      Then the "p.medium" element should be visible
      Then the "p.small" element should be visible
