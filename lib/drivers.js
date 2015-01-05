var Driver = function () {
  // Default driver is Zombie
  Driver.Zombie.call(this);
};

Driver.Zombie = require('./driver/zombie');
Driver.Selenium = require('./driver/selenium');
module.exports = Driver;
