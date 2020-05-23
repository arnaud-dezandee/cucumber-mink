const url = require('url');
const Errors = require('../utils/errors.js');

// From https://github.com/sindresorhus/is-absolute-url
const isAbsoluteUrl = (location) => /^(?:\w+:)\/\//.test(location);

const parseUrlWithEnv = (location) => {
  const matches = /^\${([^"]*)}/.exec(location);
  return (matches)
    ? process.env[matches[1]] + location.replace(matches[0], '')
    : location;
};

const setBaseURL = function (location) {
  const finalLocation = parseUrlWithEnv(location);
  if (!isAbsoluteUrl(finalLocation)) {
    throw new Error(Errors.NAVIGATION.BASE_URL);
  }
  this.mink.config.baseUrl = finalLocation;
};

const goRoot = function () {
  if (!this.mink.config.baseUrl) {
    throw new Error(Errors.NAVIGATION.ROOT);
  }
  return this.mink.page.goto(this.mink.config.baseUrl);
};

const goTo = function (location) {
  let finalLocation = location;
  if (!isAbsoluteUrl(location) && this.mink.config.baseUrl) {
    finalLocation = url.resolve(this.mink.config.baseUrl, location);
  }
  return this.mink.page.goto(finalLocation);
};

const refresh = function () {
  return this.mink.page.reload();
};

const goBack = function () {
  return this.mink.page.goBack();
};

module.exports = [
  [/^(?:|I )browse "([^"]*)"/, setBaseURL],
  [/^(?:|I )am on (?:|the )homepage/, goRoot],
  [/^(?:|I )go to (?:|the )homepage/, goRoot],
  [/^(?:|I )am on "([^"]*)"/, goTo],
  [/^(?:|I )go to "([^"]*)"/, goTo],
  [/^(?:|I )reload the page/, refresh],
  [/^(?:|I )move backward one page/, goBack],
];
