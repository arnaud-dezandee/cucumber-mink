/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var debug = require('debug')('mink:manyStep');
var async = require('async');
var _ = require('lodash');

/**
 * @param {String || Array} source  Multi-line step text or array of step
 * @param {Function}        callback
 */
module.exports = function manyStep(source, callback) {
  var lines = _.isArray(source)
    ? source
    : source.replace(/\s\s+/g, ' ').split('\n');

  debug(lines.join(', ').substr(0, 80) + '...');

  var Mink = this;
  async.eachSeries(_.compact(lines), function(line, cb) {
    Mink.runStep(line, cb);
  }, callback);
};
