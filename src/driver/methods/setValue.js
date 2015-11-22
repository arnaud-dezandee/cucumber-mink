/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * @param {String} selector
 * @param {String} value
 * @param {Function} callback
 */
module.exports = function setValue(selector, value, callback) {
  this.client
    .setValue(selector, value)
    .call(callback);
};
