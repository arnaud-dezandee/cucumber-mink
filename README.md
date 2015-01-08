<a href="http://cukes.info/"><img src="http://cukes.info/images/cucumber_logo.png" width="200px" alt="Cukes" align="right" /></a>
[![Build Status](https://travis-ci.org/AXA-GROUP-SOLUTIONS/cucumber-mink.svg?branch=master)](https://travis-ci.org/AXA-GROUP-SOLUTIONS/cucumber-mink)
[![Coverage Status](https://img.shields.io/coveralls/AXA-GROUP-SOLUTIONS/cucumber-mink.svg?branch=master)](https://coveralls.io/r/AXA-GROUP-SOLUTIONS/cucumber-mink)
[![Dependency Status](https://gemnasium.com/AXA-GROUP-SOLUTIONS/cucumber-mink.svg)](https://gemnasium.com/AXA-GROUP-SOLUTIONS/cucumber-mink)
[![Codacy Badge](https://www.codacy.com/project/badge/ac135f34f64a4c47a7aba1850acf4009)](https://www.codacy.com/public/dezandeea/cucumber-mink)
[![Code Climate](https://codeclimate.com/github/AXA-GROUP-SOLUTIONS/cucumber-mink/badges/gpa.svg)](https://codeclimate.com/github/AXA-GROUP-SOLUTIONS/cucumber-mink)

#Introduction

cucumber-mink is a [cucumber-js](https://github.com/cucumber/cucumber-js) step definition library. You can run your test with Zombie.js or with any Selenium compatible browser like Phantomjs ! 

#Topics

- [Prerequesites](#prerequesites)
- [Quick start](#quick-start)
- [Steps Reference and examples](STEPS.md)
- [Meta-steps builder](#meta-steps-builder)

# Prerequisites

* [Node.js](http://nodejs.org)
* [cucumber-js](https://github.com/cucumber/cucumber-js): `npm install -g cucumber`

# Quick start

    npm install --save cucumber-mink

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


[See available steps](STEPS.md)

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

### Step Definitions

Inside your `features/` folder, create a new `step_definitions/` folder. Step definitions are the glue between features written in Gherkin and the actual SUT (system under test). They are written in JavaScript.
Create a `login.js` file like this:

``` javascript
// features/step_definitions/login.js

var Mink        = require('cucumber-mink'),
    Ext         = Mink.Steps.Ext,
    MetaBuilder = Mink.Utils.MetaBuilder;

/////////////////////////

function login (callback) {

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

  return MetaBuilder.call(this, stepsArray, callback);
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
cucumber-js --require cucumber-mink.js --require features/step_definitions/
```

You can pass in any function inside the `stepFunc` field, here we use Mink's function available in `lib/step_definitions/ext`.
There is a complete example here: [meta.js](test/features/step_definitions/meta.js)

#Drivers

cucumber-mink comes with support for 2 drivers out of the box:

* `Zombie.js` - Insanely fast, headless browser. [assaf/zombie](https://github.com/assaf/zombie).
  It's currently the default driver, to enable it use this parameters in your `mink.js` file:

    ``` javascript
var parameters = {
      driver: {
        type: 'zombie'
      }
};
    ```
  
  To use zombie.js driver, see [examples/zombie.js](examples/zombie.js)

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

#Maintainers

The npm module for this library is maintained by:

* [Arnaud Dezandee](http://github.com/Adezandee)

#License

The MIT License (MIT)

Copyright (c) 2014 AXA Group Solutions

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
