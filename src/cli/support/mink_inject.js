const debug = require('debug')('mink:inject');

module.exports = function (parameters) {
  return function () {
    const Mink = require('../../mink.js');

    debug(parameters);
    Mink.init(this, parameters);
  };
};
