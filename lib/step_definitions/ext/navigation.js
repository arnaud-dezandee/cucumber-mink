/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var url = require('url');

///////////////////

exports.root = function(callback) {
  var baseUrl = this.driver.baseUrl;
  if (!baseUrl) {
    callback(new Error('Please provide a base url to use root functions !'));
  } else {
    this.driver.url(baseUrl, callback);
  }
};

exports.browse = function(path, callback) {
  this.driver.url(url.resolve(this.driver.baseUrl, path), callback);
};

exports.refresh = function(callback) {
  this.driver.refresh(callback);
};

exports.back = function(callback) {
  this.driver.back(callback);
};
