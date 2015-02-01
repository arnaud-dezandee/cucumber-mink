/**
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function uncheck(selector, callback) {
  this.click(selector, callback);
};
