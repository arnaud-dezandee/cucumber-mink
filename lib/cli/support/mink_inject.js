var debug = require('debug')('mink:inject');

module.exports = function(parameters) {
  return function() {
    var Mink = require('../../mink.js');
    debug(parameters);
    Mink.init(this, parameters);
  };
};
