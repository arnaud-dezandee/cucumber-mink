/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var url = require('url');

var Utility = module.exports = {};

///////////////////

function parseUrlWithEnv(input) {
  var matches = /^\${([^"]*)}/.exec(input);
  return matches ? process.env[matches[1]] + input.replace(matches[0], '') : input;
}

///////////////////

Utility.baseUrl = function(Driver, sUrl, callback) {
  var parsed      = url.parse(parseUrlWithEnv(sUrl));
  Driver.baseUrl  = url.format(parsed);
  callback();
};

Utility.viewport = function(Driver, sWidth, sHeight, callback) {
  Driver.setViewportSize({
    width:  parseInt(sWidth),
    height: parseInt(sHeight)
  }, callback);
};

Utility.wait = function(Driver, sec, callback) {
  setTimeout(callback, parseInt(sec) * 1000);
};

Utility.takeScreenshot = function(Driver, callback) {
  Driver.saveScreenshot('./screenshot.png', callback);
};
