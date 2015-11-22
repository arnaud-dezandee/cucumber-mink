/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * @param {String} fileName screenshot
 * @param {Function} callback
 */
module.exports = function saveScreenshot(fileName, callback) {
  this.client
    .saveScreenshot(fileName)
    .call(callback);
};
