var _       = require('lodash'),
    chai    = require('chai'),
    expect  = chai.expect;

///////////////////

var AssertDOM = module.exports = {};

///////////////////

function _assertHTML(Driver, assertionFunc, callback) {
  Driver.html(function (err, sHtml) {
    if (err) { callback.fail(err); }
    else {
      assertionFunc(sHtml);
      callback();
    }
  });
}

function _assertHTMLWithSelector(Driver, sSelector, assertionFunc, callback) {
  Driver.html(sSelector, function (err, sHtml) {
    if (err) { callback.fail(err); }
    else {
      if (_.isArray(sHtml)) {
        sHtml = sHtml.join('');
      }
      assertionFunc(sHtml);
      callback();
    }
  });
}

function _assertState (sFn, bExpected, Driver, sSelector, callback) {
  Driver[sFn](sSelector, function (err , bRes) {
    if (err) { callback.fail(err); }
    else {
      expect(bRes).to.be.equal(bExpected);
      callback();
    }
  });
}

///////////////////

AssertDOM.containsText = function(Driver, text, callback) {
  _assertHTML(Driver, function (sHtml) {
    expect(sHtml).to.contain(text);
  }, callback);
};

AssertDOM.notContainsText = function(Driver, text, callback) {
  _assertHTML(Driver, function (sHtml) {
    expect(sHtml).to.not.contain(text);
  }, callback);
};

AssertDOM.matchesText = function(Driver, pattern, callback) {
  _assertHTML(Driver, function (sHtml) {
    expect(sHtml).to.match(new RegExp(pattern));
  }, callback);
};

AssertDOM.notMatchesText = function(Driver, pattern, callback) {
  _assertHTML(Driver, function (sHtml) {
    expect(sHtml).to.not.match(new RegExp(pattern));
  }, callback);
};

AssertDOM.elementContainsText = function(Driver, text, element, callback) {
  _assertHTMLWithSelector(Driver, element, function (sHtml) {
    expect(sHtml).to.contain(text);
  }, callback);
};

AssertDOM.elementNotContainsText = function(Driver, text, element, callback) {
  _assertHTMLWithSelector(Driver, element, function (sHtml) {
    expect(sHtml).to.not.contain(text);
  }, callback);
};

AssertDOM.elementsCount = function(Driver, count, sSelector, callback) {
  Driver.elementsCount(sSelector, function (err, count) {
    if (err) { callback.fail(err); }
    else {
      expect(count).to.equal(parseInt(count));
      callback();
    }
  });
};

AssertDOM.elementVisible = function(Driver, sSelector, callback) {
  _assertState('isVisible', true, Driver, sSelector, callback);
};

AssertDOM.elementNotVisible = function(Driver, sSelector, callback) {
  _assertState('isVisible', false, Driver, sSelector, callback);
};

AssertDOM.elementExist = function(Driver, sSelector, callback) {
  _assertState('isExisting', true, Driver, sSelector, callback);
};

AssertDOM.elementNotExist = function(Driver, sSelector, callback) {
  _assertState('isExisting', false, Driver, sSelector, callback);
};
