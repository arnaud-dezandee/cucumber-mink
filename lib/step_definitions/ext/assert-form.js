var chai    = require('chai'),
    assert  = chai.assert;

///////////////////

function fieldValue(assertionFn) {
  return function(Driver, fieldSelector, expectedValue, callback) {
    Driver.getValue(fieldSelector, function (err, res) {
      assertionFn(res, expectedValue);
      callback(err);
    });
  };
}

function fieldState(property, state) {
  return function(Driver, fieldSelector, callback) {
    Driver[property](fieldSelector, function (err, res) {
      assert.strictEqual(res, state);
      callback(err);
    });
  };
}

///////////////////

module.exports = {
  fieldContains:      fieldValue(assert.include),
  fieldNotContains:   fieldValue(assert.notInclude),
  fieldEnabled:       fieldState('isEnabled', true),
  fieldDisabled:      fieldState('isEnabled', false),
  checkboxChecked:    fieldState('isChecked', true),
  checkboxNotChecked: fieldState('isChecked', false)
};
