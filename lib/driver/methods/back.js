/**
 * Navigate backwards in the browser history, if possible.
 * @param {Function} callback
 */
module.exports = function back(callback) {
  this.client
    .back()
    .call(callback);
};
