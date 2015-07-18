/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var debug = require('debug')('mink:defineStep');

/**
 * @param {RegExp}    pattern    step regex
 * @param {Function}  fn         step function
 */
module.exports = function defineStep(pattern, fn) {
  debug(pattern);

  // Register the step in Mink steps array
  var stepObj = {
    mink:     true,
    pattern:  pattern,
    fn:       fn
  };
  this.steps.push(stepObj);
  this.cucumber.defineStep(pattern, fn.bind(this));

  return stepObj;
};
