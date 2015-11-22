/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function getValue(selector, callback) {
  this.client.getValue(selector).then(function(value) {
    callback(null, value);
  });
};
