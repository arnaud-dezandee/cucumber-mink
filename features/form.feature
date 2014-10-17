Feature: I can use cucumber.mink to fill in forms

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Check Homepage content
    Given I am on the homepage
