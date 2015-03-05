var util = require('util');

var async   = require('async'),
    chai    = require('chai'),
    assert  = chai.assert;

var assertDOM = require('./assert-dom.js');

///////////////////

function fieldValue(assertionFn) {
  return function(Driver, fieldSelector, expectedValue, callback) {
    Driver.getValue(fieldSelector, function (err, res) {
      assertionFn(res, expectedValue);
      callback(err);
    });
  };
}

function selectHTML(assertionFn) {
  var assertHTML = assertDOM._elementHTML(assertionFn);

  return function(Driver, selectSelector, expectedValue, callback) {
    async.waterfall([
      function(cb) {
        Driver.getValue(selectSelector, cb);
      },
      function(value, element, cb) {
        var cssSelector = util.format('%s option[value="%s"]', selectSelector, value);
        assertHTML(Driver, expectedValue, cssSelector, cb);
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
