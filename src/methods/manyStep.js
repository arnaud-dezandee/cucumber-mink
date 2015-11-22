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

const debug = require('debug')('mink:manyStep');

/**
 * @param {String || Array} source  Multi-line step text or array of step
 * @param {Function}        callback
 */
export default function manyStep(source, callback) {
  const lines = _.isArray(source)
    ? source
    : source.replace(/\s\s+/g, ' ').split('\n');

  debug(lines.join(', ').substr(0, 80) + '...');

  async.eachSeries(_.compact(lines), (line, cb) => {
    this.runStep(line, cb);
  }, callback);
}
