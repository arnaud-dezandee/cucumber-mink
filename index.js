var zombieWorld = require('./lib/support/world');
var minkSteps   = require('./lib/step_definitions/mink');

module.exports = function () {
  minkSteps.call(this);
  zombieWorld.call(this);
};
