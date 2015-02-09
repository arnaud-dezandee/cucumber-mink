/**
 * Return an array of WebElements matching provided selector whose value attribute match provided value
 * @param {String} selector     element selector
 * @param {String} text         element content text
 * @param {Function} callback
 */
var async = require('async');

module.exports = function elementsWithValue(selector, value, callback) {
  var client = this.client;

  client.elements(selector, function (err, res) {
    /* istanbul ignore if */
    if (err) { return callback(err); }

    function checkValue(WebElement, cb) {
      client.elementIdAttribute(WebElement.ELEMENT, 'value', function (err, res) {
        cb(res.value === value);
      });
    }

    async.filter(res.value, checkValue, function(WebElements) {
      callback(null, WebElements);
    });
  });
};
