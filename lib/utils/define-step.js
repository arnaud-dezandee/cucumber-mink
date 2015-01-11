var _ = require('lodash');

////////////////////////////

module.exports = function () {
  var _superDefine = this.defineStep;

  function defineStep(pattern, fn) {
    _superDefine(pattern, function () {
      fn.apply(this, [this.driver].concat(_.toArray(arguments)));
    });
  }

  this.defineStep = defineStep;
  this.Given      = defineStep;
  this.When       = defineStep;
  this.Then       = defineStep;
};
