var _ = require('lodash');

////////////////////////////

module.exports = function () {
  var _superDefine = this.cucumber.defineStep;

  function defineStep(pattern, fn) {
    var Mink = this;
    _superDefine(pattern, function () {
      fn.apply(this, [Mink.driver].concat(_.toArray(arguments)));
    });
  }

  this.defineStep = defineStep;
  this.Given      = defineStep;
  this.When       = defineStep;
  this.Then       = defineStep;
};
