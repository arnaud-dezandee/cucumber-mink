var Zombie = require('zombie');

module.exports = function() {

  this.World = function World(callback) {
    this.browser = Zombie.create({runScripts: true, debug: false});
    callback();
  };

};
