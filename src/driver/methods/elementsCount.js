/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * Count how many element match the provided selector on the current page
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function elementsCount(selector, callback) {
  this.elements(selector, function (err, WebElements) {
    callback(err, WebElements.length);
  });
};
