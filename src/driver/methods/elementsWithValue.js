/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * Return an array of WebElements matching provided selector whose value attribute match provided value
 * @param {String} selector     element selector
 * @param {String} text         element content text
 * @param {Function} callback
 */
var async = require('async');

module.exports = function elementsWithValue(selector, value, callback) {
  var client = this.client;

  client.elements(selector, function(err, res) {
    /* istanbul ignore if */
    if (err) { return callback(err); }

    function checkValue(WebElement, cb) {
      client.elementIdAttribute(WebElement.ELEMENT, 'value', function(error, result) {
        /* istanbul ignore if */
        if (error) { return cb(false); }
        cb(result.value === value);
      });
    }

    async.filter(res.value, checkValue, function(WebElements) {
      callback(null, WebElements);
    });
  });
};
