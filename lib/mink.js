/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var path = require('path');
var build  = require('build-prototype');
var ext = require('./step_definitions/ext');
var pkg = require('./../package.json');

var Mink = {
  parameters: {},
  steps: [],
  Ext: ext,
  VERSION: pkg.version
};

build(Mink, path.resolve(__dirname, 'methods'));

module.exports = Mink;
