/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var assert = require('chai').assert;

///////////////////

function browserUrl(property, assertionFn) {
  return function (input, callback) {
    this.driver.url(function (err, oUrl) {
      if (err) return callback(err);
      callback(assertionFn(oUrl[property], input));
    });
  };
}

function browserUrlMatch(property) {
  return function(pattern, callback) {
    browserUrl(property, assert.returnError.match).bind(this)(new RegExp(pattern), callback);
  };
}

function browserRoot() {
  return function (callback) {
    browserUrl('pathname', assert.returnError.equal).bind(this)('/', callback);
  };
}

///////////////////

module.exports = {
  equal:       browserUrl('pathname', assert.returnError.equal),
  match:       browserUrlMatch('pathname'),
  queryMatch:  browserUrlMatch('search'),
  root:        browserRoot()
};
