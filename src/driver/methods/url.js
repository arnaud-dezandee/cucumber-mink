/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var nUrl = require('url');

/**
 * Navigate to the requested URL and/or return the browser current URL
 * @param {String} sUrl
 * @param {Function} callback
 */
module.exports = function url(sUrl, callback) {

  // Return current URL only
  if (typeof sUrl === 'function' && arguments.length === 1) {

    callback = sUrl;

    this.client.url(function (err, res) {
      callback(err, nUrl.parse(res.value));
    });

  } else {

    this.client.url(sUrl, callback);

  }
};
