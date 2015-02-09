/**
 * Return link element matching either selector or content
 * @param {String} mixed         selector or content
 * @param {Function} callback
 */
var detectSeries = require('../../utils/detect-series');
var _ = require('lodash');

module.exports = function link(mixed, callback) {
  var _this = this;

  detectSeries(
    [
      function(cb) {
        _this.elements(mixed, cb);
      },
      function(cb) {
        _this.elementsWithText('body a', mixed, cb);
      }
    ],
    function(WebElements, callback) {
      callback(!_.isEmpty(WebElements));
    },
    function(result) {
      if (!result) {
        callback(new Error('Link not found !'));
      } else {
        callback(null, _.first(result));
      }
    }
  );
};
