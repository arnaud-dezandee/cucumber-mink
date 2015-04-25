/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var debug = require('debug')('mink:defineStep');
var _ = require('lodash');

/**
 * @param {RegExp}    pattern    step regex
 * @param {Function}  fn         step function
 */
module.exports = function defineStep(pattern, fn) {
  debug('Registering step', pattern);
  // Register the step in Mink steps array
  this.steps.push({
    pattern:  pattern,
    fn:       fn
  });

  var _this = this;
  this.cucumber.defineStep(pattern, function() {
    fn.apply(this, [_this.driver].concat(_.toArray(arguments)));
  });
};
