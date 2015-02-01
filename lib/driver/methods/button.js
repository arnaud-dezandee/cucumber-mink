/**
 * Return button or input matching either selector or content
 * @param {String} mixed         selector or content
 * @param {Function} callback
 */
var _ = require('lodash');
var async = require('async');

module.exports = function button(mixed, callback) {
  var _this = this;

  function findWith(method, args) {
    return function(asyncCb) {
      _this[method].apply(_this, args.concat(function (err, elements) {
        if (_.isEmpty(elements)) {
          return asyncCb();
        }
        callback(null, _.first(elements));
        return asyncCb(true);
      }));
    };
  }

  async.series(
    [
      findWith('elements', [mixed]),
      findWith('elementsWithText', ['button', mixed]),
      findWith('elementsWithValue', ['input[type=submit]', mixed])
    ],
    function(found) {
      if (!found) { callback(new Error('Button not found !')); }
    }
  );
};
