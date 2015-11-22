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
 * @param {Function} callback
 */
module.exports = function isSelected(selector, callback) {
  this.client.isSelected(selector, callback);
};
