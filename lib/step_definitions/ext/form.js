var async = require('async');

///////////////////

function fillField (sFieldSelector, value, callback) {
  this.driver.setValue(sFieldSelector, value, callback);
}

function fillFields (fieldsArray, callback) {
  var self = this;

  async.eachSeries(
    fieldsArray,
    function (object, cb) {
      self.driver.setValue(object.field, object.value, cb);
    },
    function (err) {
      if (err) { callback.fail(new Error(err)); }
      else { callback(); }
    }
  );
}

function fillFieldsHashDataTable (hashDataTable, callback) {
  var fieldsArray = [];

  hashDataTable.raw().forEach(function (element) {
    fieldsArray.push({
      field: element[0],
      value: element[1]
    });
  });

  return fillFields.call(this, fieldsArray, callback);
}

function selectOption (sOption, sSelectSelector, callback) {
  this.driver.selectOption(sSelectSelector, sOption, callback);
}

function checkOption (sCheckboxSelector, callback) {
  var driver = this.driver;
  driver.isChecked(sCheckboxSelector, function (err, isChecked) {
    if (err) { callback.fail(err); }
    else if (isChecked) { callback(); }
    else {
      driver.click(sCheckboxSelector, callback);
    }
  });
}

function uncheckOption (sCheckboxSelector, callback) {
  var driver = this.driver;
  driver.isChecked(sCheckboxSelector, function (err, isChecked) {
    if (err) { callback.fail(err); }
    else if (! isChecked) { callback(); }
    else {
      driver.click(sCheckboxSelector, callback);
    }
  });
}

///////////////////

module.exports = {
  fillField:                fillField,
  fillFields:               fillFields,
  fillFieldsHashDataTable:  fillFieldsHashDataTable,
  selectOption:             selectOption,
  checkOption:              checkOption,
  uncheckOption:            uncheckOption
};
