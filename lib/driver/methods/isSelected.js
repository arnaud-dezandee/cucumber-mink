/**
 * @param {String} selector
 * @param {Function} callback
 */
module.exports = function isSelected(selector, callback) {
  this.client
    .isSelected(selector, callback);
};
