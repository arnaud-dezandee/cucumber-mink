/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

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
    /* istanbul ignore if */
    if (err) { return callback(err); }

    function checkText(WebElement, cb) {
      client.elementIdText(WebElement.ELEMENT, function (error, result) {
        /* istanbul ignore if */
        if (error) { return cb(false); }
        cb(result.value === text);
      });
    }

    async.filter(res.value, checkText, function(WebElements) {
      callback(null, WebElements);
    });
  });
};
