/**
 * Dependencies
 */

import { expect } from 'chai';

/**
 * Private
 */

const currentOption = function (selector, expected) {
  return this.driver.getValue(selector).then(value =>
    this.driver.html(`${selector} option[value="${value}"]`).then((html) => {
      expect(html).to.contain(expected);
    }),
  );
};

const fieldContains = function (selector, expected) {
  return this.driver.getValue(selector).then((value) => {
    expect(value).to.contain(expected);
  });
};

const fieldNotContains = function (selector, expected) {
  return this.driver.getValue(selector).then((value) => {
    expect(value).to.not.contain(expected);
  });
};

/**
 * Interface
 */

export default [
  [/the "([^"]*)" current option contain "([^"]*)"/, currentOption],
  [/the "([^"]*)" field should contain "([^"]*)"/, fieldContains],
  [/the "([^"]*)" field should not contain "([^"]*)"/, fieldNotContains],
];
