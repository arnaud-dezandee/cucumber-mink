var _ = require('lodash');

////////////////////////////

module.exports = function () {
  var superDefine = this.cucumber.defineStep;

  function defineStep(pattern, fn) {
    var _this = this;
    superDefine(pattern, function () {
      fn.apply(this, [_this.driver].concat(_.toArray(arguments)));
    });
  }

  this.defineStep = defineStep;
  this.Given      = defineStep;
  this.When       = defineStep;
  this.Then       = defineStep;
};
