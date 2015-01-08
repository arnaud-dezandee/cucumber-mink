[![Build Status](https://travis-ci.org/AXA-GROUP-SOLUTIONS/cucumber-mink.svg)](https://travis-ci.org/AXA-GROUP-SOLUTIONS/cucumber-mink)
[![Coverage Status](https://img.shields.io/coveralls/AXA-GROUP-SOLUTIONS/cucumber-mink.svg)](https://coveralls.io/r/AXA-GROUP-SOLUTIONS/cucumber-mink)
[![Dependency Status](https://gemnasium.com/AXA-GROUP-SOLUTIONS/cucumber-mink.svg)](https://gemnasium.com/AXA-GROUP-SOLUTIONS/cucumber-mink)
[![Codacy Badge](https://www.codacy.com/project/badge/ac135f34f64a4c47a7aba1850acf4009)](https://www.codacy.com/public/dezandeea/cucumber-mink)

#Introduction

cucumber-mink is a [cucumber-js](https://github.com/cucumber/cucumber-js) step definition library with focus on ease of use.

#Topics

- [Prerequesites](#prerequesites)
- [Quick start](#quick-start)
- [Steps Reference and examples](STEPS.md)
- [Meta-steps builder](#meta-steps-builder)

# Prerequisites

* [Node.js](http://nodejs.org)
* [NPM](http://npmjs.org)
* [cucumber-js](https://github.com/cucumber/cucumber-js): `npm install -g cucumber`

# Quick start

    npm install --save cucumber-mink

Create `cucumber-mink.js` file a the root of your project

``` javascript
var mink = require('cucumber-mink');

module.exports = function () {
  mink.call(this);
};
```

Use pre-defined steps in your `features/__.feature` files

``` gherkin
//  features/home.feature
Feature: I can use cucumber.mink to check the content of my website

  Background:
    Given I browse "http://localhost:3000/"

  Scenario: Check Homepage content
    Given I am on the homepage
    Then  the response status code should be 200
    And   I should see "Welcome to my awesome application" in the "h1" element
```

Run your tests

    cucumber-js --require cucumber-mink.js
    
Run a specific scenario based on the line of scenario

    cucumber-js --require cucumber-mink.js features/<testname.feature>:<scenariofirstline>


[See available steps](STEPS.md)

To avoid hard coding the tested url in the features (for multiple environments...), you can set an environment variable in your machine and then reference it in the features:

``` bash
export CUCUMBER_URL=http://localhost:3000/
```

``` gherkin
...
  Background:
    Given I browse "${CUCUMBER_URL}"
...
```

``` gherkin
...
  Background:
    Given I browse "${CUCUMBER_URL}/mixed/with/path"
...
```

## Meta-steps builder

I order to keep your features files clean and to follow the [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) principle
you can declare your own "Meta" steps that will execute several basic steps available in this library.

Here is an example of how to create a "I am logged in" step for your test suite:

So the initial multi-steps scenario to log into the application could be:

``` gherkin
Given I am on "/login"
And I fill in the following:
  | username | test@axa.com |
  | password | test         |
And I press "Login"
```

And we want to write in our tests only a one liner like:

``` gherkin
Given I am logged in
```

### Step Definitions

Inside your `features/` folder, create a new `step_definitions/` folder. Step definitions are the glue between features written in Gherkin and the actual SUT (system under test). They are written in JavaScript.
Create a `login.js` file like this:

``` javascript
//  features/step_definitions/login.js

var MetaBuilder = require('cucumber-mink').Utils.MetaBuilder;

module.exports = function() {
  this.Given(/^I am logged in$/, login);
};

///////////////////////////

function login (callback) {

  var loginFormArray = [
    { field: 'username', value: 'test@axa.com' },
    { field: 'password', value: 'test' }
  ];

  var stepsArray = [
    {
      name: 'visit',
      args: ['/login']
    },
    {
      name: 'fillFields',
      args: [loginFormArray]
    },
    {
      name: 'pressButton',
      args: ['Login']
    }
  ];

  return MetaBuilder.call(this, stepsArray, callback);
}
```

Now, use your newly defined step inside a .feature file:

``` gherkin
Scenario: I log into the application and see my dashboard
  Given I am logged in
  Then I should be on "/dashboard"
```

__Important__, don't forget to launch your test suite with the correct command: in this case

``` shell
cucumber-js --require cucumber-mink.js --require features/step_definitions/
```

There is a complete example here: [meta.js](features/step_definitions/meta.js)

Enjoy !
