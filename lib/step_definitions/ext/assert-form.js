/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var util = require('util');

var async   = require('async'),
    chai    = require('chai'),
    assert  = chai.assert;

var assertDOM = require('./assert-dom.js');

///////////////////

function fieldValue(assertionFn) {
  return function(fieldSelector, expectedValue, callback) {
    this.driver.getValue(fieldSelector, function (err, res) {
      assertionFn(res, expectedValue);
      callback(err);
    });
  };
}

function selectHTML(assertionFn) {
  return function(selectSelector, expectedValue, callback) {
    var assertHTML = assertDOM._elementHTML(assertionFn).bind(this);
    var Driver = this.driver;
    async.waterfall([
      function(cb) {
        Driver.getValue(selectSelector, cb);
      },
      function(value, cb) {
        var cssSelector = util.format('%s option[value="%s"]', selectSelector, value);
        assertHTML(expectedValue, cssSelector, cb);
      }
    ], callback);
  };
}

///////////////////

module.exports = {
  selectContains:     selectHTML(assert.include),
  fieldContains:      fieldValue(assert.include),
  fieldNotContains:   fieldValue(assert.notInclude),
  fieldEnabled:       assertDOM._elementState('isEnabled', true),
  fieldDisabled:      assertDOM._elementState('isEnabled', false),
  checkboxChecked:    assertDOM._elementState('isChecked', true),
  checkboxNotChecked: assertDOM._elementState('isChecked', false)
};
