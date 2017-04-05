/**
 * Dependencies
 */

import Errors from '../utils/errors.js';

/**
 * Private
 */

const click = function (selector) {
  return this.driver.click(selector);
};

const hover = function (selector) {
  return this.driver.hover(selector);
};

const submit = function (selector) {
  return this.driver.submitForm(selector);
};

const press = function (selector) {
  return this.driver.button(selector).then((item) => {
    if (!item) throw new Error(Errors.ACTION.CLICK_BUTTON);
    return this.driver.click(item);
  });
};

const follow = function (selector) {
  return this.driver.link(selector).then((item) => {
    if (!item) throw new Error(Errors.ACTION.CLICK_LINK);
    return this.driver.click(item);
  });
};

const sendKey = function (key, selector) {
  return this.driver.sendKey(selector, key);
};

/**
 * Interface
 */

export default [
  [/I click on "([^"]*)"/, click],
  [/I press "([^"]*)"/, press],
  [/I follow "([^"]*)"/, follow],
  [/I hover "([^"]*)" element/, hover],
  [/I submit "([^"]*)" form/, submit],
  [/I send key "([^"]*)" in "([^"]*)" element/, sendKey],
];
