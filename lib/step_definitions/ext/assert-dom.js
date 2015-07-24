/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var assert  = require('chai').assert;
var _ = require('lodash');

///////////////////

function browserHTML(assertFn) {
  return function(expectedText, callback) {
    this.driver.html(function (err, html) {
      if (err) return callback(err);
      callback(assertFn(html, expectedText));
    });
  };
}

function browserHTMLMatch(assertFn) {
  return function(pattern, callback) {
    browserHTML(assertFn).bind(this)(new RegExp(pattern), callback);
  };
}

function elementHTML(assertFn) {
  return function(expectedText, selector, callback) {
    this.driver.html(selector, function (err, html) {
      if (err) return callback(err);
      if (_.isArray(html)) {
        html = html.join('');
      }
      callback(assertFn(html, expectedText));
    });
  };
}

function elementsCount() {
  return function (expectedCount, selector, callback) {
    this.driver.elementsCount(selector, function (err, count) {
      if (err) return callback(err);
      callback(assert.returnError.strictEqual(count, parseInt(expectedCount)));
    });
  };
}

function elementState(method, state) {
  return function(selector, callback) {
    this.driver[method](selector, function (err, res) {
      if (err) return callback(err);
      callback(assert.returnError.strictEqual(res, state));
    });
  };
}

///////////////////

module.exports = {
  _elementState:          elementState,
  _elementHTML:           elementHTML,
  containsText:           browserHTML(assert.returnError.include),
  notContainsText:        browserHTML(assert.returnError.notInclude),
  matchesText:            browserHTMLMatch(assert.returnError.match),
  notMatchesText:         browserHTMLMatch(assert.returnError.notMatch),
  elementContainsText:    elementHTML(assert.returnError.include),
  elementNotContainsText: elementHTML(assert.returnError.notInclude),
  elementsCount:          elementsCount(),
  elementVisible:         elementState('isVisible', true),
  elementNotVisible:      elementState('isVisible', false),
  elementExist:           elementState('isExisting', true),
  elementNotExist:        elementState('isExisting', false)
};
