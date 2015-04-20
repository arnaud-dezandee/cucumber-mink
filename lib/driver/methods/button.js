/**
 * Return button or input matching either selector or content
 * @param {String} mixed         selector or content
 * @param {Function} callback
 */
var detectSeries = require('../../utils/detect-series');
var _ = require('lodash');

module.exports = function button(mixed, callback) {
  var _this = this;

  detectSeries(
    [
      function(cb) {
        _this.elements(mixed, function(err, elements) {
          if (err) { return cb(null); }
          cb(null, elements);
        });
      },
      function(cb) {
        _this.elementsWithText('button', mixed, cb);
      },
      function(cb) {
        _this.elementsWithValue('input[type=submit]', mixed, cb);
      }
    ],
    function(WebElements, cb) {
      cb(!_.isEmpty(WebElements));
    },
    function(result) {
      if (!result) {
        callback(new Error('Button not found !'));
      } else {
        callback(null, _.first(result));
      }
    }
  );
};
