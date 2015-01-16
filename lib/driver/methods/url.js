/**
 * Navigate to the requested URL and/or return the browser current URL
 * @param {String} sUrl
 * @param {Function} callback
 */
var URL = require('url');

module.exports = function url(sUrl, callback) {

  // Return current URL only
  if (typeof sUrl === 'function' && arguments.length === 1) {

    callback = sUrl;

    this.client.url(function (err, res) {
      callback(err, URL.parse(res.value));
    });

  } else {

    this.client.url(sUrl, callback);

  }
};
