/**
 * Dependencies
 */

import Promise from 'bluebird';

/**
 * Private
 */

const fillField = function (selector, value) {
  return this.driver.setValue(selector, value);
};

const fillFieldsHash = function (hashDataTable) {
  return Promise.each(hashDataTable.raw(), ([field, value]) =>
    this.driver.setValue(field, value),
  );
};

const selectFrom = function (option, selector) {
  return this.driver.selectByVisibleText(selector, option);
};

const checkInput = function (state) {
  return function (selector) {
    return this.driver.isChecked(selector)
    .then((isChecked) => {
      if (isChecked !== state) {
        return this.driver.check(selector);
      }
      return null;
    });
  };
};

/**
 * Interface
 */

export default [
  [/I fill in "([^"]*)" with "([^"]*)"/, fillField],
  [/I fill in "([^"]*)" with:/, fillField],
  [/I fill in the following:/, fillFieldsHash],
  [/I select "([^"]*)" from "([^"]*)"/, selectFrom],
  [/I check "([^"]*)"/, checkInput(true)],
  [/I uncheck "([^"]*)"/, checkInput(false)],
];
