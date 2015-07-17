/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var async = require('async');

/**
 * From async.js, modified to return an optional result.
 * @param eachFn
 * @param arr
 * @param iterator
 * @param mainCallback
 * @private
 */
function _detect(eachFn, arr, iterator, mainCallback) {
  eachFn(arr, function (x, index, callback) {
    iterator(x, function (v, result) {
      if (v) {
        mainCallback(result || x);
        mainCallback = async.noop;
      } else {
        callback();
      }
    });
  }, function () {
    mainCallback();
  });
}

/**
 * Invoke mainCallback with the first tasks whose result validate testFn predicate
 * @param {Array}     arr
 * @param {Function}  iterator
 * @param {Function}  callback
 */
module.exports = function detectSeries(arr, iterator, callback) {
  return _detect(async.eachOfSeries, arr, iterator, callback);
};
