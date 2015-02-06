/**
 * Hover an element based on given selector
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function hover(selector, callback) {
  this.client.moveToObject(selector, callback);
};
