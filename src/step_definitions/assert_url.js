/**
 * Dependencies
 */

import { expect } from 'chai';

/**
 * Private
 */

const isEqual = function (location) {
  return this.driver.url().then((parsed) => {
    expect(parsed.pathname).to.equal(location);
  });
};

const isRoot = function () {
  return isEqual.bind(this)('/');
};

const urlMatch = function (regex) {
  return this.driver.url().then((parsed) => {
    expect(parsed.pathname).to.match(new RegExp(regex));
  });
};

const queryMatch = function (regex) {
  return this.driver.url().then((parsed) => {
    expect(parsed.search).to.match(new RegExp(regex));
  });
};

/**
 * Interface
 */

export default [
  [/I should be on "([^"]*)"/, isEqual],
  [/I should be on (?:|the )homepage/, isRoot],
  [/the url should match (.+)/, urlMatch],
  [/the url parameter should match (.+)/, queryMatch],
];
