/**
 * Dependencies
 */

import module from 'module';

const originalLoader = module._load;
const intercept = {};

module._load = function (request) {
  if (intercept.hasOwnProperty(request)) {
    return intercept[request];
  }

  return originalLoader.apply(this, arguments);
};

/**
 * Interface
 */

export function startMocking(path, mockExport) {
  intercept[path] = mockExport;
}
