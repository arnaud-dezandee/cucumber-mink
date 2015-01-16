/**
 * @param {String} selector
 * @param {String} value
 * @param {Function} callback
 */
module.exports = function setValue(selector, value, callback) {
  this.client
    .setValue(selector, value)
    .call(callback);
};
