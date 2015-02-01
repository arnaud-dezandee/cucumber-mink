/**
 * Private method to be called in Async with any methods returning an array of elements
 * @param {String} method       selector or content
 * @param {Function} args       method arguments
 * @param {Function} found      function to be call if elements are found
 */
var _ = require('lodash');

module.exports = function _asyncFindWith(method, args, found) {
  var _this = this;

  return function(asyncCb) {
    _this[method].apply(_this, args.concat(function (err, elements) {
      if (_.isEmpty(elements)) {
        return asyncCb();
      }
      found(null, _.first(elements));
      return asyncCb(true);
    }));
  };
};
