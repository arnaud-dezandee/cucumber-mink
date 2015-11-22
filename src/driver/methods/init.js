/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * Initialize WebDriverIO by creating a new session
 * @param {Function} callback
 */
module.exports = function init(callback) {
  this.client
    .init()
    .call(callback);
};
