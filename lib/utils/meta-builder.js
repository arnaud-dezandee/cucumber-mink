var async = require('async');

////////////////////////////

function enhanceCallback(cb) {
  cb.fail = function (err) {
    return cb(err.message);
  };
  return cb;
}

function metaBuilder(stepsArray, callback) {
  var self = this;

  return async.eachSeries(
    stepsArray,
    function (stepObject, cb) {
      var argsWithCb = stepObject.args.concat(enhanceCallback(cb));
      return stepObject.stepFunc.apply(self, argsWithCb);
    },
    function (err) {
      if (err) { callback.fail(new Error(err)); }
      else { callback(); }
    }
  );
}

////////////////////////////

module.exports = metaBuilder;
