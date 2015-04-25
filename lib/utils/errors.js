/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var path = require('path'),
    _    = require('lodash');

var minkLibPath = path.resolve(__dirname, '..');
var prepareStackTrace = Error.prepareStackTrace;

////////////////////////////

/* istanbul ignore next */
module.exports = {
  debug: function() {
    Error.prepareStackTrace = prepareStackTrace;
  },
  relevant: function() {
    Error.prepareStackTrace = function (error, stack) {
      var message = [error.name + ': ' + error.message];
      _.forEach(stack, function (frame) {
        if (frame.getFileName().indexOf(minkLibPath) === 0) {
          message.push('  at ' + frame);
        }
      });
      return message.slice(0, 3).join('\n');
    };
  }
};
