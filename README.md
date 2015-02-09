<a href="http://cukes.info/"><img src="https://cukes.info/images/cucumber-logo.svg" width="200px" alt="Cukes" align="right" /></a>

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

# Introduction

cucumber-mink is a [cucumber-js](https://github.com/cucumber/cucumber-js) step definition library. You can run your test with any Selenium compatible browser like Phantomjs !

[40+ available steps](STEPS.md)

# Prerequisites

* [Node.js](http://nodejs.org)
* [PhantomJS](http://phantomjs.org/download.html)
* [cucumber-js](https://github.com/cucumber/cucumber-js): `npm install -g cucumber`

# Quick start

Launch the headless browser (default configuration is Phantomjs)

``` bash
phantomjs -w
```

Install cucumber-mink library locally

``` bash
npm install --save cucumber-mink
```

Create `mink.js` file a the root of your project

``` javascript
var mink = require('cucumber-mink');

module.exports = function () {
  mink.call(this);
};
```

Use pre-defined steps in your `features/__.feature` files

``` gherkin
// features/home.feature
Feature: I can use cucumber.mink to check the content of my website

  Background:
    Given I browse "http://localhost:3000"

  Scenario: Check Homepage content
    Given I am on the homepage
    And   I should see "Welcome to my awesome application" in the "h1" element
```

Run your tests

    cucumber-js --require mink.js
    
Run a specific scenario based on the line of scenario

    cucumber-js --require mink.js features/test.feature:<LINE_NUMBER>


You can use an environment variable and then reference it in your features files to set the base url of your application.

``` bash
export CUCUMBER_URL=http://localhost:3000
```

``` gherkin
...
  Background:
    Given I browse "${CUCUMBER_URL}"
    
  Scenario:
    Given I am on "/post/2"
...
```

## Override to standard Cucumber

The standard step definition methods are overridden by cucumber-mink so that it's easier to call the driver.

#####`World.defineStep(String pattern, Fn(Driver, [] stepsInput, Fn cb))`
The driver object is injected as the first arguments in the step function. This avoid heavy use of `this` keyword.
This affects also siblings methods : `World.Given`, `World.Then`, `World.When`.

## Meta-steps builder

I order to keep your features files clean and to follow the [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) principle
you can declare your own "Meta" steps that will execute several basic steps available in this library.

Here is an example of how to create a "I am logged in" step for your test suite:

So the initial multi-steps scenario to log into the application could be:

``` gherkin
Given I am on "/login"
  And I fill in the following:
    | input.username | test@axa.com |
    | input.password | test         |
  And I press "Login"
```

And we want to write in our tests only a one liner like:

``` gherkin
Given I am logged in
```

### Usage
#####`Mink.metaStep(Driver, [] stepsArray, Fn callback)`
Call multiple callback function in one step effectively creating a "meta" steps. StepsArray should be an Array of objects like:
``` javascript
var stepsArray = [
  {
    stepFunc: Ext.Navigation.browse,
    args: ['/form']
  },
  {
    stepFunc: Ext.Action.click,
    args: ['button[type="submit"]']
  }
];
```

### Example

Inside your `features/` folder, create a new `step_definitions/` folder. Step definitions are the glue between features written in Gherkin and the actual SUT (system under test). They are written in JavaScript.
Create a `login.js` file like this:

``` javascript
// features/step_definitions/login.js

var Mink = require('cucumber-mink'),
    Ext  = Mink.Ext;

/////////////////////////

function login (Driver, callback) {

  var loginFormArray = [
    { field: 'input.username', value: 'test@axa.com' },
    { field: 'input.password', value: 'test' }
  ];

  var stepsArray = [
    {
      stepFunc: Ext.Navigation.browse,
      args: ['/login']
    },
    {
      stepFunc: Ext.Form.fillFields,
      args: [loginFormArray]
    },
    {
      stepFunc: Ext.Action.click,
      args: ['Login']
    }
  ];

  return Mink.metaStep(Driver, stepsArray, callback);
}

/////////////////////////

module.exports = function() {
  this.Given(/^I am logged in$/, login);
};

```

Now, use your newly defined step inside a .feature file:

``` gherkin
Scenario: I log into the application and see my dashboard
  Given I am logged in
  Then I should be on "/dashboard"
```

__Important__, don't forget to launch your test suite with the correct command: in this case

``` shell
cucumber-js --require mink.js --require features/step_definitions/
```

You can pass in any function inside the `stepFunc` field, here we use Mink's function available in `lib/step_definitions/ext`.
There is a complete example here: [meta.js](test/features/step_definitions/meta.js)

# Driver

cucumber-mink comes with support for WebDriverIO out of the box:

* `WebDriverIO` - webdriver module for Node.js. [webdriverio](https://github.com/webdriverio/webdriverio).
  This driver allow you to communicate with any Selenium compatible grid/hub. The driver default settings use Phantomjs/GhostDriver.
  
    ``` javascript
var parameters = {
      driver: {
        type: 'webdriverio',
        options : {
          desiredCapabilities: {
            browserName: 'phantomjs'
          },
          logLevel: 'silent',
          port: 8910
        }
      }
};
    ```
    
    This driver can be used to communicate with various browser, like a locally running [Chrome](https://code.google.com/p/selenium/wiki/ChromeDriver) 
    or on some distant services like [SauceLabs](https://saucelabs.com/) and [BrowserStack](http://www.browserstack.com/). See [examples](examples/)

# Code Quality

[![Dependency Status][gemnasium-image]][gemnasium-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Code Climate][code-climate-image]][code-climate-url]

# Maintainers

The npm module for this library is maintained by:

* [Arnaud Dezandee](http://github.com/Adezandee)

[List of all contributors](https://github.com/AXA-GROUP-SOLUTIONS/cucumber-mink/graphs/contributors)

# License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/cucumber-mink.svg?style=flat
[npm-url]: https://www.npmjs.com/package/cucumber-mink
[travis-image]: https://img.shields.io/travis/AXA-GROUP-SOLUTIONS/cucumber-mink.svg?style=flat
[travis-url]: https://travis-ci.org/AXA-GROUP-SOLUTIONS/cucumber-mink
[coveralls-image]: https://img.shields.io/coveralls/AXA-GROUP-SOLUTIONS/cucumber-mink.svg?style=flat
[coveralls-url]: https://coveralls.io/r/AXA-GROUP-SOLUTIONS/cucumber-mink?branch=master
[gemnasium-image]: https://img.shields.io/gemnasium/AXA-GROUP-SOLUTIONS/cucumber-mink.svg
[gemnasium-url]: https://gemnasium.com/AXA-GROUP-SOLUTIONS/cucumber-mink
[code-climate-image]: https://img.shields.io/codeclimate/github/AXA-GROUP-SOLUTIONS/cucumber-mink.svg
[code-climate-url]: https://codeclimate.com/github/AXA-GROUP-SOLUTIONS/cucumber-mink
[codacy-image]: https://img.shields.io/codacy/ac135f34f64a4c47a7aba1850acf4009.svg
[codacy-url]: https://www.codacy.com/public/dezandeea/cucumber-mink
