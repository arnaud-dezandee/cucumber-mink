/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var url = require('url');
var Errors = require('../../utils/errors.js');

// From https://github.com/sindresorhus/is-absolute-url
function isAbsoluteUrl(path) {
  return /^(?:\w+:)\/\//.test(path);
}

function parseUrlWithEnv(path) {
  var matches = /^\${([^"]*)}/.exec(path);
  return matches ? process.env[matches[1]] + path.replace(matches[0], '') : path;
}

///////////////////

exports.baseUrl = function(path, callback) {
  path = parseUrlWithEnv(path);
  if (!isAbsoluteUrl(path)) {
    return callback(new Error(Errors.NAVIGATION.BASE_URL));
  }

  this.driver.baseUrl = path;
  callback();
};

exports.root = function(callback) {
  if (!this.driver.baseUrl) {
    return callback(new Error(Errors.NAVIGATION.ROOT));
  }

  this.driver.url(this.driver.baseUrl, callback);
};

exports.browse = function(path, callback) {
  if (!isAbsoluteUrl(path) && this.driver.baseUrl) {
    path = url.resolve(this.driver.baseUrl, path);
  }

  this.driver.url(path, callback);
};

exports.refresh = function(callback) {
  this.driver.refresh(callback);
};

exports.back = function(callback) {
  this.driver.back(callback);
};
