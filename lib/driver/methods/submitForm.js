/**
 * Submits a form found by given selector (or sub-elements of a form)
 * @param {String} selector form
 * @param {Function} callback
 */
module.exports = function submitForm(selector, callback) {
  this.client.submitForm(selector, callback);
};
