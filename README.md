<a href="https://cucumber.io/"><img src="https://cucumber.io/images/cucumber-logo.svg" width="200px" alt="Cukes" align="right" /></a>

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
[![JS.ORG][js-org-image]][js-org-url]

# Introduction

Cucumber-mink is a [cucumber-js](https://github.com/cucumber/cucumber-js) step definition library.

Run your test with any Selenium browser: Phantomjs, Chrome, Firefox, IE

 - [40+ Available steps](http://cucumber-mink.js.org/steps/)
 - [API References and examples](API.md)

# Prerequisites

* [Node.js](http://nodejs.org)
* Selenium server with WebDriver (Selenium 2.0), see:
	* [PhantomJS](http://phantomjs.org/download.html)
	* [Webdriver-manager](https://github.com/pose/webdriver-manager)

# Quick start

``` bash
$ npm install -g cucumber-mink
```

Launch your Selenium server (ex: PhantomJS)

``` bash
$ phantomjs -w
```

Use pre-defined steps in `features/__.feature` files

``` gherkin
# features/home.feature
Feature: I can use cucumber.mink to check the content of my website

  Background:
    Given I browse "http://localhost:3000"

  Scenario: Check Homepage content
    Given I am on the homepage
    And   I should see "Welcome to my awesome application" in the "h1" element
```

Run your tests

``` bash
$ cucumber-mink
```
    
Done !

*Note:* see help `$ cucumber-mink -h` if you're not using PhantomJs.

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

[MIT](LICENSE) © [Arnaud Dezandee](https://github.com/Adezandee)

# Inspired

This module is inspired by PHP [Behat/MinkExtension](https://github.com/Behat/MinkExtension).

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
[bithound-image]: https://www.bithound.io/github/Adezandee/cucumber-mink/badges/score.svg
[bithound-url]: https://www.bithound.io/github/Adezandee/cucumber-mink
[js-org-image]: https://img.shields.io/badge/js.org-dns-ffb400.svg
[js-org-url]: http://js.org
