/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * Handle mink.call() backward compatibility
 * @param {Object}  Cucumber    cucumber-js context
 * @param {Object}  parameters
 */
module.exports = function call(Cucumber, parameters) {
  return this.init(Cucumber, parameters);
};
