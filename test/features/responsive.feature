Feature: I can use cucumber.mink to test responsiveness of a web page

  Background:
    Given I browse "http://getbootstrap.com/examples/starter-template/"

  Scenario: Render in desktop and mobile
    Given I am on "/"
      Then the "button.navbar-toggle" element should not be visible

    Given the viewport is 320px width and 568px height
      Then the "button.navbar-toggle" element should be visible
