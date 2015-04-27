/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var debug = require('debug')('mink:manyStep');
var _ = require('lodash');

var LANG_WORDS = ['Given', 'When', 'Then', 'And', 'But', '*'];

// Trim first word if Gherkin lang
function trim(origin) {
  var words = origin.split(' ');
  if (_.contains(LANG_WORDS, _.first(words))) {
    return words.slice(1).join(' ');
  }
  return origin;
}

function toStepObj(Mink) {
  return function(line) {
    return Mink.findStep(line);
  };
}

/**
 * @param {String || Array} source  Multi-line step text or array of step
 * @param {Function}        callback
 */
module.exports = function manyStep(source, callback) {
  var Mink  = this;
  var lines = _.isArray(source) ? source : source.replace(/\s\s+/g, ' ').split('\n');

  debug(lines.join(', ').substr(0, 80) + '...');

  // Remove empty lines, trim and transform to stepObj
  lines = _.compact(lines).map(trim).map(toStepObj(Mink));

  return Mink.metaStep(lines, callback);
};
