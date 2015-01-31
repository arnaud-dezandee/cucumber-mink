var chai    = require('chai'),
    assert  = chai.assert;

///////////////////

function fieldValue(assertionFn) {
  return function(Driver, sFieldSelector, sExpectedValue, callback) {
    Driver.getValue(sFieldSelector, function (err, res) {
      assertionFn(res, sExpectedValue);
      callback(err);
    });
  };
}

function checkboxState(state) {
  return function(Driver, sCheckboxSelector, callback) {
    Driver.isChecked(sCheckboxSelector, function (err, res) {
      assert.strictEqual(res, state);
      callback(err);
    });
  };
}

///////////////////

module.exports = {
  fieldContains:      fieldValue(assert.include),
  fieldNotContains:   fieldValue(assert.notInclude),
  checkboxChecked:    checkboxState(true),
  checkboxNotChecked: checkboxState(false)
};
