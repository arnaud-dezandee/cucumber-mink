/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * @param {Object} oSize size object containing height and width property
 * @param {Function} callback
 */
module.exports = function setViewportSize(oSize, callback) {
  this.client.windowHandleSize(oSize).then(function(res) {
    callback(null, res);
  });
};
