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

function parseUrlWithEnv(input) {
  var matches = /^\${([^"]*)}/.exec(input);
  return matches ? process.env[matches[1]] + input.replace(matches[0], '') : input;
}

///////////////////

exports.baseUrl = function(sUrl, callback) {
  var parsed = url.parse(parseUrlWithEnv(sUrl));
  this.driver.baseUrl = url.format(parsed);
  callback();
};

exports.viewport = function(sWidth, sHeight, callback) {
  this.driver.setViewportSize({
    width:  parseInt(sWidth),
    height: parseInt(sHeight)
  }, callback);
};

exports.wait = function(sec, callback) {
  setTimeout(callback, parseInt(sec) * 1000);
};

exports.takeScreenshot = function(callback) {
  this.driver.saveScreenshot('./screenshot.png', callback);
};
