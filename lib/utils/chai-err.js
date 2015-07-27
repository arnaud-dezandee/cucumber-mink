module.exports = function(chai) {
  var assert = chai.assert;

  var originalAssertMethods = Object.getOwnPropertyNames(assert).filter(function (propName) {
    return typeof assert[propName] === 'function';
  });

  assert.returnError = {};
  originalAssertMethods.forEach(function (assertMethodName) {
    assert.returnError[assertMethodName] = function () {
      var args = Array.prototype.slice.call(arguments, 0);
      try {
        return assert[assertMethodName].apply(assert, args);
      } catch (error) {
        return error;
      }
    };
  });
};
