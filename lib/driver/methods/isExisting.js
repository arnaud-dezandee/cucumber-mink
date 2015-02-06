/**
 * @param {String} selector
 * @param {Function} callback
 */
module.exports = function isExisting(selector, callback) {
  this.client.isExisting(selector, callback);
};
