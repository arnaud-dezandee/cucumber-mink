/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * End the WebDriverIO session and close browser.
 * @param {Function} callback
 */
module.exports = function end(callback) {
  this.client
    .end()
    .call(callback);
};
