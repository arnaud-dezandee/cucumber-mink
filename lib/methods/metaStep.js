/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var debug = require('debug')('mink:metaStep');
var async = require('async');
var _ = require('lodash');

function enhanceCallback(cb) {
  cb.fail = function(err) {
    return _.isError(err) ? cb(err) : cb(new Error(err));
  };
  return cb;
}

/**
 * @param {Array}     steps
 * @param {Function}  callback
 */
module.exports = function metaStep(steps, callback) {
  var mink = this;

  async.eachSeries(steps, function(step, cb) {
    debug(step.pattern || 'Custom fn', step.args);
    return step.fn.apply(mink, step.args.concat(enhanceCallback(cb)));
  }, callback);
};
