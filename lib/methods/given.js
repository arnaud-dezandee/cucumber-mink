/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * @param {RegExp}    pattern    step regex
 * @param {Function}  fn         step function
 */
module.exports = function Given(pattern, fn) {
  return this.defineStep(pattern, fn);
};
