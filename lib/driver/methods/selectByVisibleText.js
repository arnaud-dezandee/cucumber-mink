/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * @param {String} selectSelector
 * @param {String} option
 * @param {Function} callback
 */
module.exports = function selectByVisibleText(selectSelector, option, callback) {
  this.client.selectByVisibleText(selectSelector, option).then(function(value) {
    callback(null, value);
  });
};
