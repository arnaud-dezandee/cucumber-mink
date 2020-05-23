/**
 * Dependencies
 */

const Promise = require('bluebird');
const dbg = require('debug');

/**
 * Private
 */

const debug = dbg('mink:detectSeries');
class Result extends Error {
  constructor(item, result) {
    super();
    this.item = item;
    this.result = result;
  }
}

/**
 * Public
 */

function detectSeries(arr, iterator, check) {
  return Promise.each(arr, (item) => (
    Promise.try(() => iterator(item))
      .tap(debug)
      .then((result) => {
        if (check(result)) {
          throw new Result(item, result);
        }
      })
  ))
    .catch(Result, ({ item, result }) => ({
      item, result,
    }));
}

/**
 * Interface
 */

module.exports = detectSeries;
