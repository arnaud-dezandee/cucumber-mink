var chai    = require('chai'),
    expect  = chai.expect;

///////////////////

function fieldContains (sFieldSelector, sExpectedValue, callback) {
  this.driver.getValue(sFieldSelector, function (err, value) {
    if (err) { callback.fail(err); }
    else {
      expect(value).to.contain(sExpectedValue);
      callback();
    }
  });
}

function fieldNotContains (sFieldSelector, sExpectedValue, callback) {
  this.driver.getValue(sFieldSelector, function (err, value) {
    if (err) { callback.fail(err); }
    else {
      expect(value).to.not.contain(sExpectedValue);
      callback();
    }
  });
}

function checkboxChecked (sCheckboxSelector, callback) {
  this.driver.isChecked(sCheckboxSelector, function (err, isSelected) {
    if (err) { callback.fail(err); }
    else {
      expect(isSelected).to.be.equal(true);
      callback();
    }
  });
}

function checkboxNotChecked (sCheckboxSelector, callback) {
  this.driver.isChecked(sCheckboxSelector, function (err, isSelected) {
    if (err) { callback.fail(err); }
    else {
      expect(isSelected).to.be.equal(false);
      callback();
    }
  });
}

///////////////////

module.exports = {
  fieldContains:      fieldContains,
  fieldNotContains:   fieldNotContains,
  checkboxChecked:    checkboxChecked,
  checkboxNotChecked: checkboxNotChecked
};
