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

Create `mink.js` support file for cucumber-js (default location for auto-load is `features/support/mink.js`)

``` javascript
var mink = require('cucumber-mink');

module.exports = function () {
  mink.init(this);
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

    cucumber-js
    
Done !

*Note:* if your `mink.js` is not in the standard location, use `cucumber-js --require path/to/mink.js`

## Meta-steps builder

I order to keep your features files clean and to follow the [DRY](http://en.wikipedia.org/wiki/Don't_repeat_yourself) principle
you can declare your own "Meta" steps that will execute several basic steps available in this library.

Here is an example of how to create a "I am logged in" step for your test suite:

So the initial multi-steps scenario to log into the application could be:

``` gherkin
Given I am on "/login"
  And I fill in the following:
    | input.username | test@test.com |
    | input.password | test          |
  And I press "Login"
```

And we want to write in our tests only a one liner like:

``` gherkin
Given I am logged in
```

### Usage
#####`mink.metaStep(Driver, [] stepsArray, Fn callback)`
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

var mink = require('cucumber-mink'),
    Ext  = mink.Ext;

/////////////////////////

function login (Driver, callback) {

  var loginFormArray = [
    { field: 'input.username', value: 'test@test.com' },
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

  return mink.metaStep(Driver, stepsArray, callback);
}

/////////////////////////

module.exports = function() {
  mink.defineStep(/^I am logged in$/, login);
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
cucumber-js --require features/step_definitions/
```

You can pass in any function inside the `stepFunc` field, here we use Mink's function available in `lib/step_definitions/ext`.
There is a complete example here: [meta.js](test/features/step_definitions/meta.js)

## Mink defineStep

Mink provide a custom step definition methods so that it's easier to call the driver
You should call this method on an initialized mink context with  `mink.defineStep`

#####`mink.defineStep(String pattern, Fn(Driver, [stepsInput,] Fn callback))`
The `Driver` object is injected as the first arguments in the step function. This avoid heavy use of `this` keyword. Siblings methods are available too:
* `mink.Given`
* `mink.Then`
* `mink.When`

# Driver

cucumber-mink comes with support for WebDriverIO out of the box:

`WebDriverIO` - WD module for Node.js. [webdriverio](https://github.com/webdriverio/webdriverio).
This driver allow you to communicate with any Selenium compatible grid/hub. The driver default settings use Phantomjs/GhostDriver

``` javascript
var parameters = {
  driver: {
    desiredCapabilities: {
      browserName: 'phantomjs'
    },
    logLevel: 'silent',
    port: 8910
  }
};
```

This driver can be used to communicate with various browser, like a locally running [Chrome](https://code.google.com/p/selenium/wiki/ChromeDriver)
or on some distant services like [SauceLabs](https://saucelabs.com/) and [BrowserStack](http://www.browserstack.com/). See [examples](examples/)

# Misc

Run a specific scenario based on the line of scenario

``` bash
cucumber-js features/test.feature:<LINE_NUMBER>
```

You can use an environment variable and then reference it in your features files to set the base url of your application

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

# Code Quality

[![Dependency Status][david-image]][david-url]
[![Codacy Badge][codacy-image]][codacy-url]
[![Code Climate][code-climate-image]][code-climate-url]
[![bitHound Score][bithound-image]][bithound-url]

# Maintainers

The npm module for this library is maintained by:

* [Arnaud Dezandee](http://github.com/Adezandee)

[List of all contributors](https://github.com/Adezandee/cucumber-mink/graphs/contributors)

# License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/cucumber-mink.svg?style=flat
[npm-url]: https://www.npmjs.com/package/cucumber-mink
[travis-image]: https://img.shields.io/travis/Adezandee/cucumber-mink.svg?style=flat
[travis-url]: https://travis-ci.org/Adezandee/cucumber-mink
[coveralls-image]: https://img.shields.io/coveralls/Adezandee/cucumber-mink.svg?style=flat
[coveralls-url]: https://coveralls.io/r/Adezandee/cucumber-mink?branch=master
[david-image]: https://img.shields.io/david/Adezandee/cucumber-mink.svg
[david-url]: https://david-dm.org/Adezandee/cucumber-mink
[code-climate-image]: https://img.shields.io/codeclimate/github/Adezandee/cucumber-mink.svg
[code-climate-url]: https://codeclimate.com/github/Adezandee/cucumber-mink
[codacy-image]: https://img.shields.io/codacy/144466c7cc514f7686ef2120d41982b8.svg
[codacy-url]: https://www.codacy.com/public/adezandee/cucumber-mink
[bithound-image]: https://www.bithound.io/github/Adezandee/cucumber-mink/badges/score.svg?
[bithound-url]: https://www.bithound.io/github/Adezandee/cucumber-mink
