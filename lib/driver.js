var Driver = function () {
  // Default driver is Zombie
  Driver.Zombie.call(this);
};

Driver.Zombie = require('./driver/zombie');
module.exports = Driver;
