var async = require('async');

////////////////////////////

function enhanceCallback (cb) {
  cb.fail = function (err) {
    return cb(err.message);
  };
  return cb;
}

////////////////////////////

module.exports = function (Driver, stepsArray, callback) {
  async.eachSeries(
    stepsArray,
    function (stepObject, cb) {
      return stepObject.stepFunc.apply(this,
        [Driver]
          .concat(stepObject.args)
          .concat(enhanceCallback(cb))
      );
    },
    function (err) {
      if (err) { callback.fail(new Error(err)); }
      else { callback(); }
    }
  );
};
