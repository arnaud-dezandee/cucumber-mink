/**
 * Return link element matching either selector or content
 * @param {String} mixed         selector or content
 * @param {Function} callback
 */
var _ = require('lodash');
var async = require('async');

module.exports = function link(mixed, callback) {
  var _this = this;

  function findAssumingSelector(cb) {
    _this.elements(mixed, function (err, elements) {
      cb(null, _.first(elements) || null);
    });
  }
  function findAssumingText(previous, cb) {
    if (previous) { return cb(null, previous); }
    _this.elementsWithText('body a', mixed, function (err, elements) {
      cb(null, _.first(elements) || null);
    });
  }

  async.waterfall([findAssumingSelector, findAssumingText], callback);
};
