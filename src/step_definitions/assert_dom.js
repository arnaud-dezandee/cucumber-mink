const { expect } = require('chai');

const seeText = function (expected) {
  return this.mink.html().then((html) => {
    expect(html).to.contain(expected);
  });
};

const notSeeText = function (expected) {
  return this.mink.html().then((html) => {
    expect(html).to.not.contain(expected);
  });
};

const matchText = function (regex) {
  return this.mink.html().then((html) => {
    expect(html).to.match(new RegExp(regex));
  });
};

const notMatchText = function (regex) {
  return this.mink.html().then((html) => {
    expect(html).to.not.match(new RegExp(regex));
  });
};

const elementContainsText = function (expected, selector) {
  selector = this.mink.getSelector(selector);
  return this.mink.html(selector).then((html) => {
    expect(html).to.contain(expected);
  });
};

const elementNotContainsText = function (expected, selector) {
  selector = this.mink.getSelector(selector);
  return this.mink.html(selector).then((html) => {
    expect(html).to.not.contain(expected);
  });
};

const elementTextContainsText = function (expected, selector) {
  selector = this.mink.getSelector(selector);
  return this.mink.text(selector).then((str) => {
    expect(str).to.contain(expected);
  });
};

const elementTextNotContainsText = function (expected, selector) {
  selector = this.mink.getSelector(selector);
  return this.mink.text(selector).then((str) => {
    expect(str).to.not.contain(expected);
  });
};

const elementsCount = function (expected, selector) {
  selector = this.mink.getSelector(selector);
  return this.mink.count(selector).then((count) => {
    expect(count).to.equal(parseInt(expected, 10));
  });
};

const waitForSelector = (visible = false, hidden = false) => {
  return function (selector) {
    selector = this.mink.getSelector(selector);
    return this.mink.page.waitForSelector(selector, {
      timeout: 100,
      visible,
      hidden,
    }).then((handle) => {
      expect(handle).to.not.equal(undefined);
      if (handle) handle.dispose();
    });
  };
};

const isExisting = waitForSelector();
const isNotExisting = waitForSelector(false, true);
const isVisible = waitForSelector(true);
const isNotVisible = waitForSelector(false, true);

const isChecked = (expected) => {
  return function (selector) {
    selector = this.mink.getSelector(selector);
    /* istanbul ignore next */
    return this.mink.page.$eval(selector, (elem) => elem.checked)
      .then((res) => expect(res).to.equal(expected));
  };
};

const isDisabled = (expected) => {
  return function (selector) {
    selector = this.mink.getSelector(selector);
    /* istanbul ignore next */
    return this.mink.page.$eval(selector, (elem) => elem.disabled)
      .then((res) => expect(res).to.equal(expected));
  };
};

module.exports = [
  [/^(?:|I )should see "([^"]*)"$/, seeText],
  [/^(?:|I )should not see "([^"]*)"$/, notSeeText],
  [/^(?:|I )should see text matching (.+)$/, matchText],
  [/^(?:|I )should not see text matching (.+)$/, notMatchText],
  [/^(?:|I )should see (\d+) "([^"]*)" elements?$/, elementsCount],
  [/^(?:|I )should see "([^"]*)" in the "([^"]*)" element$/, elementContainsText],
  [/^(?:|I )should see "([^"]*)" in the "([^"]*)" element text$/, elementTextContainsText],
  [/^(?:|I )should not see "([^"]*)" in the "([^"]*)" element$/, elementNotContainsText],
  [/^(?:|I )should not see "([^"]*)" in the "([^"]*)" element text$/, elementTextNotContainsText],
  [/^(?:|I )should see an? "([^"]*)" element$/, isVisible],
  [/^(?:|I )should not see an? "([^"]*)" element$/, isNotVisible],
  [/the "([^"]*)" element should be visible$/, isVisible],
  [/the "([^"]*)" element should not be visible$/, isNotVisible],
  [/the "([^"]*)" element should exist$/, isExisting],
  [/the "([^"]*)" element should not exist$/, isNotExisting],
  [/the "([^"]*)" (?:field|element) should be enabled$/, isDisabled(false)],
  [/the "([^"]*)" (?:field|element) should be disabled$/, isDisabled(true)],
  [/the "([^"]*)" checkbox should be checked$/, isChecked(true)],
  [/the checkbox "([^"]*)" (?:is|should be) checked$/, isChecked(true)],
  [/the "([^"]*)" checkbox should not be checked$/, isChecked(false)],
  [/the checkbox "([^"]*)" should (?:be unchecked|not be checked)$/, isChecked(false)],
  [/the checkbox "([^"]*)" is (?:unchecked|not checked)$/, isChecked(false)],
];
