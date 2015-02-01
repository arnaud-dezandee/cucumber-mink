# CHANGELOG

## Master
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
* BC: MetaStep builder methods now accessible through `Mink.metaStep(Driver, [] stepsArray, Fn callback)`

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
