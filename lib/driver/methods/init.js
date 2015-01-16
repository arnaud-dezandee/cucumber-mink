/**
 * Initialize WebDriverIO by creating a new session
 * @param {Function} callback
 */
module.exports = function init(callback) {
  this.client
    .init()
    .call(callback);
};
