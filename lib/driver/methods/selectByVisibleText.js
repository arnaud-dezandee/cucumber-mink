/**
 * @param {String} selectSelector
 * @param {String} option
 * @param {Function} callback
 */
module.exports = function selectByVisibleText(selectSelector, option, callback) {
  this.client
    .selectByVisibleText(selectSelector, option)
    .call(callback);
};
