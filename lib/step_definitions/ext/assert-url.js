var chai    = require('chai'),
    expect  = chai.expect;

///////////////////

function _assertUrl(Driver, assertionFunc, callback) {
  Driver.url(function (err, oUrl) {
    if (err) { callback.fail(err); }
    else {
      assertionFunc(oUrl);
      callback();
    }
  });
}

///////////////////

function equal (Driver, path, callback) {
  _assertUrl(Driver, function (oUrl) {
    expect(oUrl.pathname).to.equal(path);
  }, callback);
}

function root (Driver, callback) {
  equal(Driver, '/', callback);
}

function match(Driver, pattern, callback) {
  _assertUrl(Driver, function (oUrl) {
    expect(oUrl.pathname).to.match(new RegExp(pattern));
  }, callback);
}

function queryMatch(Driver, pattern, callback) {
  _assertUrl(Driver, function (oUrl) {
    expect(oUrl.search).to.match(new RegExp(pattern));
  }, callback);
}

///////////////////

module.exports = {
  equal:       equal,
  root:        root,
  match:       match,
  queryMatch:  queryMatch
};
