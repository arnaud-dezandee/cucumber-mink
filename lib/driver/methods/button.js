/**
 * Return button or input matching either selector or content
 * @param {String} mixed         selector or content
 * @param {Function} callback
 */
var _ = require('lodash');
var async = require('async');

module.exports = function button(mixed, callback) {
  var _this = this;

  function findAssumingSelector(cb) {
    _this.elements(mixed, function (err, elements) {
      cb(null, _.first(elements) || null);
    });
  }
  function findButtonAssumingText(previous, cb) {
    if (previous) { return cb(null, previous); }
    _this.elementsWithText('button', mixed, function (err, elements) {
      cb(null, _.first(elements) || null);
    });
  }
  function findInputAssumingValue(previous, cb) {
    if (previous) { return cb(null, previous); }
    _this.elementsWithValue('input[type=submit]', mixed, function (err, elements) {
      cb(null, _.first(elements) || null);
    });
  }

  async.waterfall(
    [
      findAssumingSelector,
      findButtonAssumingText,
      findInputAssumingValue
    ],
    callback
  );
};
