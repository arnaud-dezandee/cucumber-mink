/**
 * Dependencies
 */

const _module = require('module');

const originalLoader = _module._load;
const intercept = {};

/* eslint prefer-rest-params: 0 */
_module._load = function (request) {
  if ({}.hasOwnProperty.call(intercept, request)) {
    return intercept[request];
  }

  return originalLoader.apply(this, arguments);
};

/**
 * Interface
 */

module.exports = function startMocking(path, mockExport) {
  intercept[path] = mockExport;
};
