/**
 * @param {String} selector
 * @param {Function} callback
 */
module.exports = function isEnabled(selector, callback) {
  this.client
    .isEnabled(selector, callback);
};
