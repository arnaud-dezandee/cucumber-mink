/**
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function uncheck(selector, callback) {
  this.client
    .click(selector)
    .call(callback);
};
