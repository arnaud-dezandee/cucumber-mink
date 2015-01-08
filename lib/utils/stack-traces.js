var path = require('path'),
    _    = require('lodash');

var minkLibPath = path.resolve(__dirname, '..');

// Short StackTraces !
module.exports = function (depth) {
  depth = depth || 2;

  Error.prepareStackTrace = function (error, stack) {
    var message = [error.name + ': ' + error.message];
    _.forEach(stack, function (frame) {
      if (frame.getFileName().indexOf(minkLibPath) === 0) {
        message.push('  at ' + frame);
      }
    });
    return message.slice(0, depth + 1).join('\n');
  };
};
