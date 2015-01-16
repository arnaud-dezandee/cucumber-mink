/**
 * End the WebDriverIO session and close browser.
 * @param {Function} callback
 */
module.exports = function end(callback) {
  this.client
    .end()
    .call(callback);
};
