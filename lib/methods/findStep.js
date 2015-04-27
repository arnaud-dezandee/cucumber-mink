/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var debug = require('debug')('mink:findStep');
var _ = require('lodash');

/**
 * Find a matching registered step and build a stepObj from Mink context
 * @param {String} text
 */
module.exports = function findStep(text) {
  var step = _.find(this.steps, function(minkStep) {
    return text.match(minkStep.pattern);
  });

  debug(text, '=>', step && step.pattern || null);

  if (!step) {
    throw new Error('Could not find matching step for text: ' + text);
  }

  return _.assign(step, {
    args: text.match(step.pattern).slice(1)
  });
};
