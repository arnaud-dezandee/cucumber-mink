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

var Driver = function() {
  this.client = null;
  this.baseUrl = null;
  this.options = {};
};

build(Driver.prototype, path.join(__dirname, 'methods'));

Driver.prototype.create = function(options) {
  this.client  = WebDriverIO.remote(options);
  this.baseUrl = options.baseUrl;
  this.options = options;

  return this;
};

///////////////////

module.exports = new Driver();
