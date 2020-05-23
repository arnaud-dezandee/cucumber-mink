/* eslint no-param-reassign: 0 */
const Promise = require('bluebird');

const fillField = function (selector, value) {
  selector = this.mink.getSelector(selector);
  /* istanbul ignore next */
  return this.mink.page.$eval(selector, (el, val) => {
    el.value = val;
  }, value);
};

const fillFieldsHash = function (hashDataTable) {
  /* istanbul ignore next */
  return Promise.each(hashDataTable.raw(), ([field, value]) => (
    this.mink.page.$eval(field, (el, val) => {
      el.value = val;
    }, value)
  ));
};

const selectFrom = function (option, selector) {
  selector = this.mink.getSelector(selector);
  return this.mink.elementsWithText(`${selector} option`, option).then((handles) => {
    return Promise.each(handles, (handle) => {
      /* istanbul ignore next */
      return this.mink.page.evaluate((x) => x.value, handle)
        .then((value) => this.mink.page.select(selector, value))
        .then(() => handle.dispose());
    });
  });
};

const checkInput = function (state) {
  return function (selector) {
    selector = this.mink.getSelector(selector);
    /* istanbul ignore next */
    return this.mink.page.$eval(selector, (el, val) => {
      el.checked = val;
    }, state);
  };
};

module.exports = [
  [/^(?:|I )fill in "([^"]*)" with "([^"]*)"/, fillField],
  [/^(?:|I )fill in "([^"]*)" with:/, fillField],
  [/^(?:|I )fill in the following:/, fillFieldsHash],
  [/^(?:|I )select "([^"]*)" from "([^"]*)"/, selectFrom],
  [/^(?:|I )check "([^"]*)"/, checkInput(true)],
  [/^(?:|I )uncheck "([^"]*)"/, checkInput(false)],
];
