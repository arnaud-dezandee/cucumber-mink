/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var debug = require('debug')('mink:runStep');
var _ = require('lodash');

/**
 * @param {String}    str
 * @param {Function}  callback
 */
module.exports = function runStep(str, callback) {
  var Driver  = this.driver;
  var step    = this.findStep(str);

  debug(step && step.input);
  return step.fn.apply(this, [Driver].concat(step.args, callback));
};
