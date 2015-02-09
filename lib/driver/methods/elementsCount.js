/**
 * Count how many element match the provided selector on the current page
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function elementsCount(selector, callback) {
  this.elements(selector, function (err, WebElements) {
    callback(err, WebElements.length);
  });
};
