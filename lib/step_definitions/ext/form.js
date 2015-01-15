var async = require('async');

///////////////////

function fillField (Driver, sFieldSelector, value, callback) {
  Driver.setValue(sFieldSelector, value, callback);
}

function fillFields (Driver, fieldsArray, callback) {
  async.eachSeries(
    fieldsArray,
    function (object, cb) {
      Driver.setValue(object.field, object.value, cb);
    },
    function (err) {
      if (err) { callback.fail(new Error(err)); }
      else { callback(); }
    }
  );
}

function fillFieldsHashDataTable (Driver, hashDataTable, callback) {
  var fieldsArray = [];

  hashDataTable.raw().forEach(function (element) {
    fieldsArray.push({
      field: element[0],
      value: element[1]
    });
  });

  return fillFields(Driver, fieldsArray, callback);
}

function selectOption (Driver, sOption, sSelectSelector, callback) {
  Driver.selectByVisibleText(sSelectSelector, sOption, callback);
}

function checkOption (Driver, sCheckboxSelector, callback) {
  Driver.isChecked(sCheckboxSelector, function (err, isChecked) {
    if (err) { callback.fail(err); }
    else if (isChecked) { callback(); }
    else {
      Driver.check(sCheckboxSelector, callback);
    }
  });
}

function uncheckOption (Driver, sCheckboxSelector, callback) {
  Driver.isChecked(sCheckboxSelector, function (err, isChecked) {
    if (err) { callback.fail(err); }
    else if (! isChecked) { callback(); }
    else {
      Driver.uncheck(sCheckboxSelector, callback);
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
