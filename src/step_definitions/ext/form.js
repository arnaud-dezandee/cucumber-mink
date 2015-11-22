/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var async = require('async');

///////////////////

function fillField(selector, value, callback) {
  return this.driver.setValue(selector, value, callback);
}

function fillFields(fieldsArray, callback) {
  var Driver = this.driver;
  async.eachSeries(
    fieldsArray,
    function (object, cb) {
      Driver.setValue(object.field, object.value, cb);
    },
    callback
  );
}

function fillFieldsHash(hashDataTable, callback) {
  return fillFields.bind(this)(hashDataTable.raw().map(function(element) {
    return {
      field: element[0],
      value: element[1]
    };
  }), callback);
}

function selectOption(option, selectSelector, callback) {
  return this.driver.selectByVisibleText(selectSelector, option, callback);
}

function checkOption(state) {
  return function(checkboxSelector, callback) {
    var Driver = this.driver;
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
