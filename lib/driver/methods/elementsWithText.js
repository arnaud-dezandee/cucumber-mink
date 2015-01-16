/**
 * Return an array of WebElements matching provided selector whose content match provided text
 * @param {String} selector     element selector
 * @param {String} text         element content text
 * @param {Function} callback
 */
var async = require('async');

module.exports = function elementsWithText(selector, text, callback) {
  var client = this.client;

  client.elements(selector, function (err, res) {
    if (err) { return callback(err, null); }

    function checkText(WebElement, cb) {
      client.elementIdText(WebElement.ELEMENT, function (err, res) {
        cb(res.value === text);
      });
    }

    async.filter(res.value, checkText, function(WebElements) {
      callback(null, WebElements);
    });
  });
};
