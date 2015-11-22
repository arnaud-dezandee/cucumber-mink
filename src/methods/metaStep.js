/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

import async from 'async';
import _ from 'lodash';

const debug = require('debug')('mink:metaStep');

function enhanceCallback(cb) {
  cb.fail = err => {
    return _.isError(err) ? cb(err) : cb(new Error(err));
  };
  return cb;
}

/**
 * @param {Array}     steps
 * @param {Function}  callback
 */
export default function metaStep(steps, callback) {
  async.eachSeries(steps, (step, cb) => {
    debug(step.pattern || 'Custom fn', step.args);
    return step.fn.apply(this, step.args.concat(enhanceCallback(cb)));
  }, callback);
}
