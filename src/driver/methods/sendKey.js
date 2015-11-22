/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */
var async = require('async');

/**
 * Send key to element based on given selector
 * @param {String} selector element
 * @param {String} key
 * @param {Function} callback
 */
module.exports = function sendKey(selector, key, callback) {
  var client = this.client;
  async.series([
    function(cb) {
      client.click(selector).call(cb);
    },
    function(cb) {
      client.keys(key).call(cb);
    }
  ], callback);
};
