/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * Returns the HTML contents of the selected elements. With no arguments returns the HTML contents of the document.
 * @param {String} selector element
 * @param {Function} callback
 */
module.exports = function html(selector, callback) {
  if (typeof selector === 'function' && arguments.length === 1) {
    callback = selector;
    selector = null;

    this.client.getSource(callback);
  } else {
    this.client.getHTML(selector, callback);
  }
};
