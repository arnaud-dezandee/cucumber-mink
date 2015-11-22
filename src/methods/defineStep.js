/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

const debug = require('debug')('mink:defineStep');

/**
 * @param {RegExp}    pattern    step regex
 * @param {Function}  fn         step function
 */
export default function defineStep(pattern, fn) {
  debug('defineStep', pattern);

  const stepObj = { mink: true, pattern, fn };
  this.steps.push(stepObj);
  this.cucumber.defineStep(pattern, fn.bind(this));

  return stepObj;
}
