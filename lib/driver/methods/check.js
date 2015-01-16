/**
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function check(selector, callback) {
  this.client
    .click(selector)
    .call(callback);
};
