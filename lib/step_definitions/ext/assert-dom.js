/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var _       = require('lodash'),
    chai    = require('chai'),
    assert  = chai.assert;

///////////////////

function browserHTML(assertFn) {
  return function(Driver, expectedText, callback) {
    Driver.html(function (err, html) {
      assertFn(html, expectedText);
      callback(err);
    });
  };
}

function browserHTMLMatch(assertFn) {
  return function(Driver, pattern, callback) {
    browserHTML(assertFn)(Driver, new RegExp(pattern), callback);
  };
}

function elementHTML(assertFn) {
  return function(Driver, expectedText, selector, callback) {
    Driver.html(selector, function (err, html) {
      if (_.isArray(html)) {
        html = html.join('');
      }
      assertFn(html, expectedText);
      callback(err);
    });
  };
}

function elementsCount() {
  return function (Driver, expectedCount, selector, callback) {
    Driver.elementsCount(selector, function (err, count) {
      assert.strictEqual(count, parseInt(expectedCount));
      callback(err);
    });
  };
}

function elementState(method, state) {
  return function(Driver, selector, callback) {
    Driver[method](selector, function (err, res) {
      assert.strictEqual(res, state);
      callback(err);
    });
  };
}

///////////////////

module.exports = {
  _elementState:          elementState,
  _elementHTML:           elementHTML,
  containsText:           browserHTML(assert.include),
  notContainsText:        browserHTML(assert.notInclude),
  matchesText:            browserHTMLMatch(assert.match),
  notMatchesText:         browserHTMLMatch(assert.notMatch),
  elementContainsText:    elementHTML(assert.include),
  elementNotContainsText: elementHTML(assert.notInclude),
  elementsCount:          elementsCount(),
  elementVisible:         elementState('isVisible', true),
  elementNotVisible:      elementState('isVisible', false),
  elementExist:           elementState('isExisting', true),
  elementNotExist:        elementState('isExisting', false)
};
