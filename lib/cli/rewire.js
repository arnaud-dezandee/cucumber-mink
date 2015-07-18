var Module           = require('module');
var originalLoader   = Module._load;
var intercept        = {};

Module._load = function(request /*, parent*/) {
  if (intercept.hasOwnProperty(request)) {
    return intercept[request];
  }

  return originalLoader.apply(this, arguments);
};

module.exports = function startMocking(path, mockExport) {
  intercept[path] = mockExport;
};
