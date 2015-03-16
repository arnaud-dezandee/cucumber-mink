var path = require('path');

var WebDriverIO  = require('webdriverio');
var _ = require('lodash');

var buildPrototype = require('../utils/build-prototype.js');

var WD_DEFAULTS = {
  desiredCapabilities: {
    browserName: 'phantomjs'
  },
  logLevel: 'silent',
  port: 8910
};

///////////////////

function Driver(client) {
  this.client = client;
}

buildPrototype(Driver.prototype, path.join(__dirname, '/methods'));

///////////////////

module.exports = function (options) {
  options = _.defaults(options || {}, WD_DEFAULTS);
  var client = WebDriverIO.remote(options);

  this.driver = new Driver(client);
};
