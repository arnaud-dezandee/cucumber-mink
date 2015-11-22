/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

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
