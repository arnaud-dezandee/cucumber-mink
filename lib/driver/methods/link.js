/**
 * Return an array of WebElements matching provided selector whose content match provided text
 * @param {String} mixed         selector or content
 * @param {Function} callback
 */
var _ = require('lodash');
var async = require('async');

module.exports = function link(mixed, callback) {
  var self = this;

  function findAssumingSelector(cb) {
    self.elements(mixed, function (err, elements) {
      cb(null, _.first(elements) || null);
    });
  }
  function findAssumingText(previous, cb) {
    if (previous) { return cb(null, previous); }
    self.elementsWithText('body a', mixed, function (err, elements) {
      cb(null, _.first(elements) || null);
    });
  }

  async.waterfall([findAssumingSelector, findAssumingText], callback);
};
