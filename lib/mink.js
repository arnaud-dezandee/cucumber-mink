/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var path  = require('path');
var build = require('build-prototype');

var Mink = function() {
  this.initialized = false;
  this.parameters = {};
  this.steps = [];
  this.driver = null;
};

build(Mink.prototype, path.resolve(__dirname, 'methods'));

var mink = new Mink();

mink.Ext = require('./step_definitions/ext');
mink.VERSION = require('./../package.json').version;

module.exports = mink;
