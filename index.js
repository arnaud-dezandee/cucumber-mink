var driver  = require('./lib/driver/zombie');
var steps   = require('./lib/steps/mink_steps');

module.exports = function () {
  driver.call(this);
  steps.call(this);
};
