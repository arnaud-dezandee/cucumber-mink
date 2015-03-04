/**
 * Return an array of WebElements matching provided selector
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function elements(selector, callback) {
  this.client.elements(selector, function (err, res) {
    if (err) {
      return callback(err);
    }
    return callback(null, res.value);
  });
};
