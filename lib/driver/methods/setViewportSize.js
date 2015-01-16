/**
 * @param {Object} oSize size object containing height and width property
 * @param {Function} callback
 */
module.exports = function setViewportSize(oSize, callback) {
  this.client
    .setViewportSize(oSize)
    .call(callback);
};
