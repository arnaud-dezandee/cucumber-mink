/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * Navigate backwards in the browser history, if possible.
 * @param {Function} callback
 */
module.exports = function back(callback) {
  this.client
    .back()
    .call(callback);
};
