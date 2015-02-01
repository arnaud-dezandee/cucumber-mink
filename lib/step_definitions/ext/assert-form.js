var chai    = require('chai'),
    assert  = chai.assert;

var assertDOM = require('./assert-dom');

///////////////////

function fieldValue(assertionFn) {
  return function(Driver, fieldSelector, expectedValue, callback) {
    Driver.getValue(fieldSelector, function (err, res) {
      assertionFn(res, expectedValue);
      callback(err);
    });
  };
}

///////////////////

module.exports = {
  fieldContains:      fieldValue(assert.include),
  fieldNotContains:   fieldValue(assert.notInclude),
  fieldEnabled:       assertDOM._elementState('isEnabled', true),
  fieldDisabled:      assertDOM._elementState('isEnabled', false),
  checkboxChecked:    assertDOM._elementState('isChecked', true),
  checkboxNotChecked: assertDOM._elementState('isChecked', false)
};
