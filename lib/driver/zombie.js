// Zombie.js Initialisation
var zInterface  = require('./interface/zombie'),
    Zombie      = require('zombie'),
    _           = require('lodash');

var Z_DEFAULTS = {
  runScripts: true,
  debug: false
};

module.exports = function(options) {
  options = _.defaults(options || {}, Z_DEFAULTS);
  var browser = Zombie.create(options);
  var driver  = zInterface(browser);

  this.World = function World(callback) {
    this.driver = driver;
    callback();
  };

  this.registerHandler('AfterFeatures', function (event, callback) {
    driver.end(callback);
  });
};
