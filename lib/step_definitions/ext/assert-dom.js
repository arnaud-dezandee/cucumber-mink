var _       = require('lodash'),
    chai    = require('chai'),
    expect  = chai.expect;

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

///////////////////

function containsText (Driver, text, callback) {
  _assertHTML(Driver, function (sHtml) {
    expect(sHtml).to.contain(text);
  }, callback);
}

function notContainsText (Driver, text, callback) {
  _assertHTML(Driver, function (sHtml) {
    expect(sHtml).to.not.contain(text);
  }, callback);
}

function matchesText (Driver, pattern, callback) {
  _assertHTML(Driver, function (sHtml) {
    expect(sHtml).to.match(new RegExp(pattern));
  }, callback);
}

function notMatchesText (Driver, pattern, callback) {
  _assertHTML(Driver, function (sHtml) {
    expect(sHtml).to.not.match(new RegExp(pattern));
  }, callback);
}

function elementContainsText (Driver, text, element, callback) {
  _assertHTMLWithSelector(Driver, element, function (sHtml) {
    expect(sHtml).to.contain(text);
  }, callback);
}

function elementNotContainsText (Driver, text, element, callback) {
  _assertHTMLWithSelector(Driver, element, function (sHtml) {
    expect(sHtml).to.not.contain(text);
  }, callback);
}

function elementOnPage (Driver, sSelector, callback) {
  Driver.element(sSelector, function (err , element) {
    if (err) { callback.fail(err); }
    else if (!element) { callback.fail(new Error('Element not found ! :' + sSelector)); }
    else { callback(); }
  });
}

function elementNotOnPage (Driver, sSelector, callback) {
  Driver.element(sSelector, function (err, element) {
    if (err || !element) { callback(); }
    else { callback.fail(new Error('Element found ! :' + sSelector)); }
  });
}

function elementCount (Driver, count, sSelector, callback) {
  Driver.elements(sSelector, function (err, elements) {
    if (err) { callback(err); }
    else if (!elements) { callback.fail(new Error('Element not found ! :' + sSelector)); }
    else {
      expect(elements.length).to.equal(parseInt(count));
      callback();
    }
  });
}

///////////////////

module.exports = {
  containsText:           containsText,
  notContainsText:        notContainsText,
  matchesText:            matchesText,
  notMatchesText:         notMatchesText,
  elementCount:           elementCount,
  elementContainsText:    elementContainsText,
  elementNotContainsText: elementNotContainsText,
  elementOnPage:          elementOnPage,
  elementNotOnPage:       elementNotOnPage
};
