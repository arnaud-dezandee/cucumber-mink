/**
 * Refresh the current page.
 * @param {Function} callback
 */
module.exports = function refresh(callback) {
  this.client
    .refresh()
    .call(callback);
};
