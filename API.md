# API Reference

- [Core](#core)
    - [`Mink.init(Object Cucumber, Object options)`](#minkinitobject-cucumber-object-options---undefined)
    - [`Mink.call(Object Cucumber, Object options)`](#minkcallobject-cucumber-object-options---undefined)
    - [`Mink.defineStep(Regex pattern, Function fn)`](#minkdefinestepregex-pattern-function-fn---stepobj)
    - [`Mink.Given(Regex pattern, Function fn)`](#minkgivenregex-pattern-function-fn---stepobj)
    - [`Mink.Then(Regex pattern, Function fn)`](#minkthenregex-pattern-function-fn---stepobj)
    - [`Mink.When(Regex pattern, Function fn)`](#minkwhenregex-pattern-function-fn---stepobj)
    - [`Mink.findStep(String input)`](#minkfindstepstring-input---stepobj)
    - [`Mink.manyStep(String|Array<String> source, Function callback)`](#minkmanystepstringarraystring-source-function-callback---undefined)
    - [`Mink.metaStep(Array<StepObj> steps, Function callback)`](#minkmetasteparraystepobj-steps-function-callback---undefined)
    - [`Mink.runStep(String input, Function callback)`](#minkrunstepstring-input-function-callback---stepobj)
- [Driver](#driver)
- [Misc](#misc)

## Core

Core methods of `Mink` instance.

##### `Mink.init(Object Cucumber, Object options)` -> `Undefined`

Mink initialization method and entry point. Pass in the `Cucumber` context and an `options` object 

```js
var parameters = {
  driver: {
    desiredCapabilities: {
      browserName: 'phantomjs'
    },
    logLevel: 'silent',
    port: 8910
  }
};

Mink.init(Cucumber, parameters);
```

<hr>

##### `Mink.call(Object Cucumber, Object options)` -> `Undefined`

Deprecated. Use [`Mink.init()`](#minkinitobject-cucumber-object-options---undefined)

<hr>

##### `Mink.defineStep(Regex pattern, Function fn)` -> `StepObj`

Define a new step inside Mink-Cucumber context for use in `.features` files. Return the built `StepObj`.

The `Driver` object is injected as the first arguments in the step function. This avoid heavy use of `this` keyword.

```js
function doSomething(input, callback) {...}

Mink.defineStep(/^I do something with "([^"]*)" input$/, doSomething);
```

<hr>

##### `Mink.Given(Regex pattern, Function fn)` -> `StepObj`
##### `Mink.Then(Regex pattern, Function fn)` -> `StepObj`
##### `Mink.When(Regex pattern, Function fn)` -> `StepObj`

Syntactic sugar for [`Mink.defineStep()`](#minkdefinestepregex-pattern-function-fn---stepobj).

<hr>

##### `Mink.findStep(String input)` -> `StepObj`

Search through all defined step inside Mink context for a matching step with `input` string.

Return a `StepObj` or throws an error if none matches.

```js
Mink.findStep('Given I go to the homepage');
```

Note: the `StepObj` is enhanced with additional fields
 * `input` - findStep query
 * `args`  - regex capturing groups

<hr>

##### `Mink.manyStep(String|Array<String> source, Function callback)` -> `Undefined`

Takes `String` or `Array<String>` as the `source` and tries to execute each line in series as Cucumber steps.

Callback when all steps are done.

```js
Mink.manyStep([
  'I browse "http://localhost:3000/"',
  'I am on the homepage',
  'I should be on the homepage'
], callback);
```

<hr>

##### `Mink.metaStep(Array<StepObj> steps, Function callback)` -> `Undefined`

Takes `Array<StepObj>` and executes each step in series.

Callback when all steps are done.

```js
var stepsArray = [
  {
    fn:   Ext.Navigation.browse,
    args: ['/form']
  },
  {
    fn:   Ext.Action.click,
    args: ['button[type="submit"]']
  }
];

Mink.metaStep(stepsArray, callback);
```

<hr>

##### `Mink.runStep(String input, Function callback)` -> `StepObj`

Search and execute the step matching `input` string. Return the executed `StepObj`.

```js
Mink.runStep('I press ".button-missing"', function(err) {
  assert.isNull(err);
});
```

## Driver

cucumber-mink uses WebDriverIO internally: [WebDriverIO](https://github.com/webdriverio/webdriverio).

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

This driver can be used to communicate with various browser:
 * [Chrome](examples/local-chrome.js)
 * [Firefox](examples/local-firefox.js)
 * [SauceLabs](https://saucelabs.com/)
 * [BrowserStack](http://www.browserstack.com/)
See [examples](examples/)

## Misc

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
