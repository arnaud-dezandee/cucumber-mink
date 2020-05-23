const { expect } = require('chai');
const url = require('url');

const isEqual = function (location) {
  const parsed = url.parse(this.mink.page.url());
  expect([parsed.pathname, parsed.search].join('')).to.equal(location);
};

const isRoot = function () {
  return isEqual.bind(this)('/');
};

const urlMatch = function (regex) {
  const parsed = url.parse(this.mink.page.url());
  expect(parsed.pathname).to.match(new RegExp(regex));
};

const queryMatch = function (regex) {
  const parsed = url.parse(this.mink.page.url());
  expect(parsed.search).to.match(new RegExp(regex));
};

module.exports = [
  [/^(?:|I )should be on "([^"]*)"/, isEqual],
  [/^(?:|I )should be on (?:|the )homepage/, isRoot],
  [/the url should match (.+)/, urlMatch],
  [/the url parameter should match (.+)/, queryMatch],
];
