var buildPrototype = require('../utils/build-prototype');

///////////////////

function Driver(client) {
  this.client = client;
}

buildPrototype(Driver.prototype, __dirname + '/methods');

///////////////////

module.exports.init = function (client) {
  // Object initialisation
  return new Driver(client);
};
