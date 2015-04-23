/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * Submits a form found by given selector
 * The submit command may also be applied to any element that is a descendant of a <form> element
 * @param {String} selector form
 * @param {Function} callback
 */
module.exports = function submitForm(selector, callback) {
  this.client.submitForm(selector, callback);
};
