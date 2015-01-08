var chai    = require('chai'),
    expect  = chai.expect;

///////////////////

function _assertUrl(assertionFunc, callback) {
  this.driver.currentUrl(function (err, oUrl) {
    if (err) { callback.fail(err); }
    else {
      assertionFunc(oUrl);
      callback();
    }
  });
}

///////////////////

function equal (path, callback) {
  _assertUrl.call(this, function (oUrl) {
    expect(oUrl.pathname).to.equal(path);
  }, callback);
}

function root (callback) {
  equal.call(this, '/', callback);
}

function match(pattern, callback) {
  _assertUrl.call(this, function (oUrl) {
    expect(oUrl.pathname).to.match(new RegExp(pattern));
  }, callback);
}

function queryMatch(pattern, callback) {
  _assertUrl.call(this, function (oUrl) {
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
