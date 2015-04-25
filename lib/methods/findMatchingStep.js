/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var debug = require('debug')('mink:findMatchingStep');
var _ = require('lodash');

/**
 * Find a matching registered step and build a stepObj from Mink context
 * @param {String} text
 */
module.exports = function findMatchingStep(text) {
  var step = _.find(this.steps, function(minkStep) {
    return text.match(minkStep.pattern);
  });

  if (!step) {
    debug('No Matching step for', text);
    return null;
  }

  debug('Matching step', step.pattern);
  return {
    pattern:  step.pattern,
    stepFunc: step.fn,
    args:     text.match(step.pattern).slice(1)
  };
};
