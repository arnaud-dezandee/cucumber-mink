# CHANGELOG

### 1.2.3 (2016-05-31)


#### Bug Fixes

* **api:** correctly execute callbacks if present in API methods ([d419e4be](https://github.com/Adezandee/cucumber-mink/commit/d419e4be))


### 1.2.2 (2016-04-14)


#### Bug Fixes

* **mink:** print error and exit inside before and after handlers ([d85bfedb](https://github.com/Adezandee/cucumber-mink/commit/d85bfedb))

### 1.2.1 (2016-04-14)


#### Bug Fixes

* **cli:** cast cli inject parameter as boolean ([0e51fd55](https://github.com/Adezandee/cucumber-mink/commit/0e51fd55))
* **mink:** catch before and after features errors ([774da3ae](https://github.com/Adezandee/cucumber-mink/commit/774da3ae))

## 1.2.0 (2016-04-12)


#### Features

* **package:** update cucumber to version 0.10.2 ([eb1f01a2](https://github.com/Adezandee/cucumber-mink/commit/eb1f01a2))

### 1.1.1 (2016-03-04)


#### Bug Fixes

* **mink:** es6 module - commonjs require interop ([164f6d87](https://github.com/Adezandee/cucumber-mink/commit/164f6d87))
* **test:** add lodash as dev dependencies for tests ([7cd9340e](https://github.com/Adezandee/cucumber-mink/commit/7cd9340e))


## v1.1.0 (2016-02-12)
* Major dependencies version bump
* Rewrite to ES2015 and Bluebird Promises
* Added some mocha unit tests alongside e2e
* Added step: `/^I send key "([^"]*)" in "([^"]*)" element$/`

## v1.0.2 (2015-07-27)
* Fix #24: Chai assertion errors are now correctly sent in the callback pipeline

## v1.0.1 (2015-07-21)
* Fix #22: Handle driver.baseUrl parameter from Mink.init() properly

## v1.0.0 (2015-07-18)
* Upgraded cucumber-js (0.5.2) and WebDriverIO (3.1.0)
* Added `cucumber-mink` CLI tool with Mink auto-injection into cucumber-js context
* Removed `Driver` object automatic injection in Mink's step functions
* Exported build-prototype to standalone package.

## v0.5.0 (2015-05-19)
* BC: Unified `StepObj` blueprint between Mink's functions
* Added new methods on Mink object: `mink.findStep()`, `mink.manyStep()`, `mink.runStep()`
* Exported internal testing methods in spec files
* Enabled Firefox in Travis-CI

## v0.4.0 (2015-03-19)
* BC: `cucumber.defineStep()` and siblings reverted to standard cucumber-js.
* BC: Mink is now a less intrusive library. You should call it with `mink.init(cucumberContext, parameters)` instead of `mink.call()`.
* BC: Mink is no longer automatically attached to cucumber context in any way. To use it in your custom files, use `mink = require('cucumber-mink')`.
* Added: `mink.defineStep()` and siblings `mink.Given`, `mink.Then`, `mink.When`
* Added step: `/^the "([^"]*)" current option contain "([^"]*)"$/`
* Switched to ESLint

## v0.3.0 (2015-02-09)
* Added step: `/^I hover "([^"]*)" element$/`
* Added step: `/^I submit "([^"]*)" form$/`
* Added step: `/^I take a screenshot$/`
* Added step: `/^the "([^"]*)" field should be enabled$/`
* Added step: `/^the "([^"]*)" field should be disabled$/`
* Removed deprecated step on status code
* Improved code coverage

## v0.2.2 (2015-01-31)
* Improved code-climate with factorized Assert-* methods
* Upgraded npm dependencies
* Updated README

## v0.2.1 (2015-01-16)
* Added Link compatibility method: `/^I follow "([^"]*)"$/` now accepts CSS Selector or <a> tag text content
* Added Press button compatibility method: `/^I press "([^"]*)"$/` now accepts CSS Selector or <button> & <input type="submit" \> tag text content
* Refactored driver methods file structure

## v0.2.0 (2015-01-15)
* Added new step: `the viewport is <X>px width and <Y>px height`
* Added automatic screenshot on scenario failure if `driver.options.screenshotPath` is defined
* Default viewport size of WebDriver is : width: 1366px, height: 768px
* BC: Dropped Zombie.js driver support
* BC: New methods signature for `World.defineStep` and siblings methods. Direct injection of Driver object.
* BC: MetaStep builder methods now accessible through `mink.metaStep(Driver, [] stepsArray, Fn callback)`

## v0.1.0 (2015-01-08)
* Added [WebDriverIO](https://github.com/webdriverio/webdriverio) Selenium driver support, default driver still Zombie.js
* Created driver API between Zombie.js and WebDriverIO
* Added parameters to cucumber-mink Constructor (mainly for driver options)
* Added Coveralls, and Code-climate
* BC: MetaBuilder now use `stepFunc` instead of `name`. You have to pass in a function (from this repository or custom)
* BC: All steps now only accepts CSS Selector
* DEPRECATED: removed step /^the response status code should be (\d+)$/
* DEPRECATED: removed step /^the response status code should not be (\d+)$/
* UPDATE: npm dependencies upgrade

## v0.0.3 (2014-12-29)
* initial release with Zombie.js support
