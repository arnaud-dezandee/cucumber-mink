/**
 * Dependencies
 */

import Promise from 'bluebird';

/**
 * Private
 */

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
    return iterator(item)
    .then(result => {
      if (check(result)) throw new Result(item, result);
    });
  })
  .catch(Result, ({ item, result }) => {
    return {
      item,
      result,
    };
  });
}

/**
 * Interface
 */

export default detectSeries;
