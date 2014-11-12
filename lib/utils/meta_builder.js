var mink  = require('../steps/mink');
    async = require('async');

module.exports = metaBuilder;

//////////////////

function metaBuilder(stepsArray, callback) {
  var self = this;

  return async.eachSeries(
    stepsArray,
    function (stepObject, cb) {
      var argsWithCb = stepObject.args.concat(enhanceCallback(cb));

      if (!mink.hasOwnProperty(stepObject.name)) {
        return cb('Invalid step name: ' + stepObject.name + '. Check mink.js for valid entries.');
      } else {
        return mink[stepObject.name].apply(self, argsWithCb);
      }

    },
    function (err) {
      if (err) { callback.fail(new Error(err)); }
      else { callback(); }
    }
  );
}

function enhanceCallback(cb) {
  cb.fail = function (err) {
    return cb(err.message);
  };
  return cb;
}
