/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var debug = require('debug')('mink:runStep');

/**
 * @param {String}    input
 * @param {Function}  callback
 */
module.exports = function runStep(input, callback) {
  var Driver  = this.driver;
  var step    = this.findStep(input);

  debug(step && step.input);
  step.fn.apply(this, [Driver].concat(step.args, callback));

  return step;
};
