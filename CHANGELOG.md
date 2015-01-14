# CHANGELOG

## Master
* BC: Dropped Zombie.js driver support
* BC: New methods signature for `World.defineStep` and siblings methods. Direct injection of Driver object.
* BC: MetaStep builder methods now accessible through `Mink.metaStep(Driver driver, [] stepsArray, Function callback)`

## v0.1.0 (2015-01-08)
* Added [WebDriverIO](https://github.com/webdriverio/webdriverio) Selenium driver support, default driver still Zombie.js
* Created driver API between Zombie.js and WebDriverIO
* Added parameters to cucumber-mink Constructor (mainly for driver options)
* BREAKING CHANGE: MetaBuilder now use `stepFunc` instead of `name`. You have to pass in a function (from this repository or custom)
* BREAKING CHANGE: All steps now only accepts CSS Selector
* DEPRECATED: removed step /^the response status code should be (\d+)$/
* DEPRECATED: removed step /^the response status code should not be (\d+)$/
* UPDATE: npm dependencies upgrade
* Added Coveralls, and Code-climate

## v0.0.3 (2014-12-29)
* initial release with Zombie.js support
