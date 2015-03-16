var _ = require('lodash');
var async = require('async');

////////////////////////////

function enhanceCallback(cb) {
  cb.fail = function(err) {
    if (_.isError(err)) {
      cb(err);
    } else {
      cb(new Error(err));
    }
  };
  return cb;
}

////////////////////////////

module.exports = function(Driver, stepsArray, callback) {
  async.eachSeries(
    stepsArray,
    function(stepObject, cb) {
      return stepObject.stepFunc.apply(this,
        [Driver]
          .concat(stepObject.args)
          .concat(enhanceCallback(cb))
      );
    },
    callback
  );
};
