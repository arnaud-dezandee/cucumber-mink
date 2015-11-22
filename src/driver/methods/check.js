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
module.exports = function check(selector, callback) {
  this.click(selector, callback);
};
