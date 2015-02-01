/**
 * Return button or input matching either selector or content
 * @param {String} mixed         selector or content
 * @param {Function} callback
 */
var async = require('async');

module.exports = function button(mixed, callback) {
  var _this = this;

  async.series(
    [
      _this._asyncFindWith('elements', [mixed], callback),
      _this._asyncFindWith('elementsWithText', ['button', mixed], callback),
      _this._asyncFindWith('elementsWithValue', ['input[type=submit]', mixed], callback)
    ],
    function(found) {
      if (!found) { callback(new Error('Button not found !')); }
    }
  );
};
