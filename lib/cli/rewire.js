var Module           = require('module')
  , originalLoader   = Module._load
  , intercept        = {};

Module._load = function(request /*, parent*/) {
  if (intercept.hasOwnProperty(request)) {
    return intercept[request];
  }

  return originalLoader.apply(this, arguments);
};

function startMocking(path, mockExport) {
  intercept[path] = mockExport;
}

function stopMocking(path) {
  delete intercept[path];
}

module.exports = startMocking;
module.exports.stop = stopMocking;
