/**
 * @param {String} selector
 * @param {Function} callback
 */
module.exports = function isVisible(selector, callback) {
  this.client
    .isVisible(selector, callback);
};
