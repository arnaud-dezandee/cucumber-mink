/**
 * Return link element matching either selector or content
 * @param {String} mixed         selector or content
 * @param {Function} callback
 */
var async = require('async');

module.exports = function link(mixed, callback) {
  var _this = this;

  async.series(
    [
      _this._asyncFindWith('elements', [mixed], callback),
      _this._asyncFindWith('elementsWithText', ['body a', mixed], callback)
    ],
    function(found) {
      if (!found) { callback(new Error('Link not found !')); }
    }
  );
};
