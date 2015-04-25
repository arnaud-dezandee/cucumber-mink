Feature: I can use partial scenario

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Navigation
    Given I execute first partial
    Given I execute second partial
    Given I execute third partial
    Given I execute fourth partial
