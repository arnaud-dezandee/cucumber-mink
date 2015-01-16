/**
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function getValue(selector, callback) {
  this.client.getValue(selector, callback);
};
