var Steps = function () {
  // Import mink steps by default
  Steps.Mink.call(this);
};

Steps.Mink          = require('./steps/mink_steps');
Steps.MinkFunctions = require('./steps/mink');
module.exports = Steps;
