/**
 * Click on an element based on given selector or WebElement.
 * @param {String} selector element or WebElement
 * @param {Function} callback
 */
module.exports = function click(selector, callback) {

  if (typeof selector === 'string') {
    this.client
      .click(selector)
      .call(callback);

  } else if (typeof selector === 'object' && selector.ELEMENT) {
    this.client
      .elementIdClick(selector.ELEMENT)
      .call(callback);
  }

};
