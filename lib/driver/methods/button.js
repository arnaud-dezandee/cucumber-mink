/**
 * Return button or input matching either selector or content
 * @param {String} mixed         selector or content
 * @param {Function} callback
 */
var _ = require('lodash');
var async = require('async');

module.exports = function button(mixed, callback) {
  var self = this;

  function findAssumingSelector(cb) {
    self.elements(mixed, function (err, elements) {
      cb(null, _.first(elements) || null);
    });
  }
  function findButtonAssumingText(previous, cb) {
    if (previous) { return cb(null, previous); }
    self.elementsWithText('button', mixed, function (err, elements) {
      cb(null, _.first(elements) || null);
    });
  }
  function findInputAssumingValue(previous, cb) {
    if (previous) { return cb(null, previous); }
    self.elementsWithValue('input[type=submit]', mixed, function (err, elements) {
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
