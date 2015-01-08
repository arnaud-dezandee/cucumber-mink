var mink = require('./../mink');

// Zombie.js
var parameters = {
  driver: {
    type: 'zombie'
  }
};

module.exports = function () {
  mink.call(this, parameters);
};
