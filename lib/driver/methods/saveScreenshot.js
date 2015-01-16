/**
 * @param {String} fileName screenshot
 * @param {Function} callback
 */
module.exports = function saveScreenshot(fileName, callback) {
  this.client
    .saveScreenshot(fileName)
    .call(callback);
};
