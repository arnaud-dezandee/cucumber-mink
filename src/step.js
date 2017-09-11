/**
 * Dependencies
 */

const Promise = require('bluebird');

/**
 * Private
 */

function noop() {
  // No operation performed.
}

/**
 * Interface
 */

module.exports = class Step {
  constructor(pattern, fn, args = []) {
    this.pattern = pattern;
    this.fn = fn;
    this.args = args;
  }

  match(line) {
    return line.match(this.pattern);
  }

  runWith(context, line, cb = noop) {
    const args = (line) ? this.match(line).slice(1) : this.args;
    return Promise.try(() => (
      this.fn.apply(context, args)
    )).asCallback(cb);
  }
};
