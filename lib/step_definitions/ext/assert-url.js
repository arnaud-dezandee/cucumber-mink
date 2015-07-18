/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var chai    = require('chai'),
    assert  = chai.assert;

///////////////////

function browserUrl(property, assertionFn) {
  return function (input, callback) {
    this.driver.url(function (err, oUrl) {
      assertionFn(oUrl[property], input);
      callback(err);
    });
  };
}

function browserUrlMatch(property) {
  return function(pattern, callback) {
    browserUrl(property, assert.match).bind(this)(new RegExp(pattern), callback);
  };
}

function browserRoot() {
  return function (callback) {
    browserUrl('pathname', assert.equal).bind(this)('/', callback);
  };
}

///////////////////

module.exports = {
  equal:       browserUrl('pathname', assert.equal),
  match:       browserUrlMatch('pathname'),
  queryMatch:  browserUrlMatch('search'),
  root:        browserRoot()
};
