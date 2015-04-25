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

////////////////////////////

function enhanceCallback(cb) {
  cb.fail = function(err) {
    if (_.isError(err)) {
      cb(err);
    } else {
      cb(new Error(err));
    }
  };
  return cb;
}

/**
 * @param {RegExp}    stepsArray
 * @param {Function}  callback
 */
module.exports = function metaStep(stepsArray, callback) {
  var Driver = this.driver;

  async.eachSeries(stepsArray, function(stepObject, cb) {
    debug('Executing step with args', stepObject.args);
    return stepObject.stepFunc.apply(this,
      [Driver]
        .concat(stepObject.args)
        .concat(enhanceCallback(cb))
    );
  }, callback);
};
