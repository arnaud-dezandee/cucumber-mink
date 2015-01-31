var chai    = require('chai'),
    assert  = chai.assert;

///////////////////

function browserUrl(property, assertionFn) {
  return function (Driver, input, callback) {
    Driver.url(function (err, oUrl) {
      assertionFn(oUrl[property], input);
      callback(err);
    });
  };
}

function browserUrlMatch(property) {
  return function(Driver, pattern, callback) {
    browserUrl(property, assert.match)(Driver, new RegExp(pattern), callback);
  };
}

function browserRoot() {
  return function (Driver, callback) {
    browserUrl('pathname', assert.equal)(Driver, '/', callback);
  };
}

///////////////////

module.exports = {
  equal:       browserUrl('pathname', assert.equal),
  match:       browserUrlMatch('pathname'),
  queryMatch:  browserUrlMatch('search'),
  root:        browserRoot()
};
