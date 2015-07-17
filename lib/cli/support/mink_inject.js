module.exports = function(parameters) {
  return function() {
    var Mink = require('../../mink.js');
    Mink.init(this, parameters);
  };
};
