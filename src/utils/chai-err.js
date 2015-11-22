export default function(chai) {
  const assert = chai.assert;

  const originalAssertMethods = Object.getOwnPropertyNames(assert).filter(propName => {
    return typeof assert[propName] === 'function';
  });

  assert.returnError = {};
  originalAssertMethods.forEach(assertMethodName => {
    assert.returnError[assertMethodName] = function chaiErr() {
      const args = Array.prototype.slice.call(arguments, 0);
      try {
        return assert[assertMethodName].apply(assert, args);
      } catch (error) {
        return error;
      }
    };
  });
}
