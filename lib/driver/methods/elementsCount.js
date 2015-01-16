/**
 * Count how many element match the provided selector on the current page
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function elementsCount(selector, callback) {
  this.client.elements(selector, function (err, res) {
    callback(err, res.value.length);
  });
};
