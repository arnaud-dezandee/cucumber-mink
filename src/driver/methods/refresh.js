/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * Refresh the current page.
 * @param {Function} callback
 */
module.exports = function refresh(callback) {
  this.client
    .refresh()
    .call(callback);
};
