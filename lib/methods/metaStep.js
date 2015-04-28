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
  var Driver = this.driver;

  async.eachSeries(steps, function(step, cb) {
    debug(step.pattern || 'Custom fn', step.args);
    return step.fn.apply(this, [Driver].concat(step.args, enhanceCallback(cb)));
  }, callback);
};
