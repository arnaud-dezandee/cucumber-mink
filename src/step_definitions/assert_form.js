const { expect } = require('chai');

const currentOption = function (selector, expected) {
  selector = this.mink.getSelector(selector);
  /* istanbul ignore next */
  return this.mink.page.$eval(selector, (x) => x.value).then((value) => {
    return this.mink.html(`${selector} option[value="${value}"]`).then((html) => {
      expect(html).to.contain(expected);
    });
  });
};

const fieldContains = function (selector, expected) {
  selector = this.mink.getSelector(selector);
  /* istanbul ignore next */
  return this.mink.page.$eval(selector, (x) => x.value).then((value) => {
    expect(value).to.contain(expected);
  });
};

const fieldNotContains = function (selector, expected) {
  selector = this.mink.getSelector(selector);
  /* istanbul ignore next */
  return this.mink.page.$eval(selector, (x) => x.value).then((value) => {
    expect(value).to.not.contain(expected);
  });
};

module.exports = [
  [/the "([^"]*)" current option contain "([^"]*)"/, currentOption],
  [/the "([^"]*)" field should contain "([^"]*)"/, fieldContains],
  [/the "([^"]*)" field should not contain "([^"]*)"/, fieldNotContains],
];
