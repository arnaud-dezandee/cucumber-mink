/**
 * Click on an element based on given selector or WebElement.
 * @param {String} selector element or WebElement
 * @param {Function} callback
 */
module.exports = function click(selector, callback) {
  if (typeof selector === 'string') {
    return this.client.click(selector).call(callback);
  }
  if (typeof selector === 'object' && selector.ELEMENT) {
    return this.client.elementIdClick(selector.ELEMENT).call(callback);
  }
  callback(new Error('Type mismatch, selector should be string or WebElement obj'));
};
