var CucumberMink = function() {
  CucumberMink.Driver.call(this);
  CucumberMink.Steps.call(this);
};

CucumberMink.Driver = require('./lib/driver');
CucumberMink.Steps  = require('./lib/steps');
CucumberMink.Utils  = require('./lib/utils');

module.exports = CucumberMink;
