/**
 * Call callback function when client if ready
 * @param {Function} callback
 */
module.exports = function ready(callback) {
  this.client
    .call(callback);
};
