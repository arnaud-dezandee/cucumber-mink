/**
 * Dependencies
 */

import module from 'module';

const originalLoader = module._load;
const intercept = {};

/* eslint prefer-rest-params: 0 */
module._load = function (request) {
  if ({}.hasOwnProperty.call(intercept, request)) {
    return intercept[request];
  }

  return originalLoader.apply(this, arguments);
};

/**
 * Interface
 */

export default function startMocking(path, mockExport) {
  intercept[path] = mockExport;
}
