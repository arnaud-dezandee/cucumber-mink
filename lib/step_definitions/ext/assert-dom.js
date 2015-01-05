var chai    = require('chai'),
    expect  = chai.expect;

///////////////////

function _assertHTML(assertionFunc, callback) {
  this.driver.html(function (err, sHtml) {
    if (err) { callback.fail(err); }
    else {
      assertionFunc(sHtml);
      callback();
    }
  })
}

function _assertHTMLWithSelector(sSelector, assertionFunc, callback) {
  this.driver.html(sSelector, function (err, sHtml) {
    if (err) { callback.fail(err); }
    else {
      assertionFunc(sHtml);
      callback();
    }
  })
}

///////////////////

function containsText (text, callback) {
  _assertHTML.call(this, function (sHtml) {
    expect(sHtml).to.contain(text);
  }, callback);
}

function notContainsText (text, callback) {
  _assertHTML.call(this, function (sHtml) {
    expect(sHtml).to.not.contain(text);
  }, callback);
}

function matchesText (pattern, callback) {
  _assertHTML.call(this, function (sHtml) {
    expect(sHtml).to.match(new RegExp(pattern));
  }, callback);
}

function notMatchesText (pattern, callback) {
  _assertHTML.call(this, function (sHtml) {
    expect(sHtml).to.not.match(new RegExp(pattern));
  }, callback);
}

function elementContainsText (text, element, callback) {
  _assertHTMLWithSelector.call(this, element, function (sHtml) {
    expect(sHtml).to.contain(text);
  }, callback);
}

function elementNotContainsText (text, element, callback) {
  _assertHTMLWithSelector.call(this, element, function (sHtml) {
    expect(sHtml).to.not.contain(text);
  }, callback);
}

function elementOnPage (sSelector, callback) {
  this.driver.element(sSelector, function (err , element) {
    if (err) { callback.fail(err); }
    else if (!element) { callback.fail(new Error('Element not found ! :' + sSelector)); }
    else { callback(); }
  });
}

function elementNotOnPage (sSelector, callback) {
  this.driver.element(sSelector, function (err, element) {
    if (err || !element) { callback(); }
    else { callback.fail(new Error('Element found ! :' + sSelector)); }
  });
}

function elementCount (count, sSelector, callback) {
  this.driver.elements(sSelector, function (err, elements) {
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
