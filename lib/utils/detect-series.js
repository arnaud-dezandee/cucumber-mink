var async = require('async');

///////////////////

module.exports = function detectSeries (tasks, testFn, mainCallback) {
  async.mapSeries(tasks, function (fn, callback) {
    fn(function (err, result) {
      /* istanbul ignore if */
      if (err) { return callback(err); }

      testFn(result, function(valid, testRes) {
        if (valid) {
          return mainCallback(testRes || result);
        }
        return callback();
      });
    });
  }, function() {
    mainCallback();
  });
};
