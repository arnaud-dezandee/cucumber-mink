var path = require('path');
var WebDriverIO = require('webdriverio');
var buildPrototype = require('../utils/build-prototype.js');

///////////////////

function Driver(client) {
  this.client = client;
}

buildPrototype(Driver.prototype, path.join(__dirname, '/methods'));

///////////////////

module.exports = function (options) {
  this.driver = new Driver(WebDriverIO.remote(options));
};
