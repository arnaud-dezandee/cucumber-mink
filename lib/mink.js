/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var path = require('path');

var buildPrototype  = require('./utils/build-prototype.js');
var ext = require('./step_definitions/ext');
var pkg = require('./../package.json');

var Mink = function() {
  this.parameters = {};
  this.steps      = [];

  this.Ext        = ext;
  this.VERSION    = pkg.version;
};

buildPrototype(Mink.prototype, path.join(__dirname, '/methods'));

module.exports = (function() {
  return new Mink();
}());
