/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var path = require('path');
var build = require('build-prototype');
var WebDriverIO = require('webdriverio');

///////////////////

function Driver(client, options) {
  this.client   = client;
  this.options  = options;
}

build(Driver.prototype, path.join(__dirname, 'methods'));

///////////////////

module.exports.create = function create(options) {
  return new Driver(WebDriverIO.remote(options), options);
};
