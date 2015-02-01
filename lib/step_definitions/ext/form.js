var async = require('async');

///////////////////

function fillField(Driver, selector, value, callback) {
  Driver.setValue(selector, value, callback);
}

function fillFields(Driver, fieldsArray, callback) {
  async.eachSeries(
    fieldsArray,
    function (object, cb) {
      Driver.setValue(object.field, object.value, cb);
    },
    callback
  );
}

function fillFieldsHash(Driver, hashDataTable, callback) {
  var fieldsArray = [];

  hashDataTable.raw().forEach(function (element) {
    fieldsArray.push({
      field: element[0],
      value: element[1]
    });
  });

  return fillFields(Driver, fieldsArray, callback);
}

function selectOption(Driver, option, selectSelector, callback) {
  Driver.selectByVisibleText(selectSelector, option, callback);
}

function checkOption(state) {
  return function(Driver, checkboxSelector, callback) {
    Driver.isChecked(checkboxSelector, function (err, isChecked) {
      /* istanbul ignore if */
      if (err) {
        return callback(err);
      }
      if (state === isChecked) {
        return callback();
      }

      Driver[state ? 'check' : 'uncheck'](checkboxSelector, callback);
    });
  };
}

///////////////////

module.exports = {
  fillField:      fillField,
  fillFields:     fillFields,
  fillFieldsHash: fillFieldsHash,
  selectOption:   selectOption,
  checkOption:    checkOption(true),
  uncheckOption:  checkOption(false)
};
