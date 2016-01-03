/**
 * Dependencies
 */

import Promise from 'bluebird';
import dbg from 'debug';

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
  return Promise.each(arr, item => {
    return Promise.try(() => iterator(item))
    .tap(debug)
    .then(result => {
      if (check(result)) {
        throw new Result(item, result);
      }
    });
  })
  .catch(({ item, result }) => {
    return { item, result };
  });
}

/**
 * Interface
 */

export default detectSeries;
