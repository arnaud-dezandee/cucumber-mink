/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/* eslint no-sync:0 */

var fs    = require('fs');
var path  = require('path');

///////////////////

function assign(proto) {
  return function (fn) {
    proto[fn.name] = fn;
  };
}

function realDir(base) {
  return function (file) {
    return path.join(base, file);
  };
}

///////////////////

module.exports = function buildPrototype (proto, dir) {
  return fs
    .readdirSync(dir)
    .map(realDir(dir))
    .map(require)
    .forEach(assign(proto));
};
