/**
 * Dependencies
 */

import url from 'url';
import Errors from '../utils/errors.js';

/**
 * Private
*/

// From https://github.com/sindresorhus/is-absolute-url
const isAbsoluteUrl = location => /^(?:\w+:)\/\//.test(location);

const parseUrlWithEnv = location => {
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

  this.driver.baseUrl = finalLocation;
};

const goRoot = function () {
  if (!this.driver.baseUrl) {
    throw new Error(Errors.NAVIGATION.ROOT);
  }

  return this.driver.url(this.driver.baseUrl);
};

const goTo = function (location) {
  let finalLocation = location;

  if (!isAbsoluteUrl(location) && this.driver.baseUrl) {
    finalLocation = url.resolve(this.driver.baseUrl, location);
  }

  return this.driver.url(finalLocation);
};

const refresh = function () {
  return this.driver.refresh();
};

const goBack = function () {
  return this.driver.back();
};

/**
 * Interface
 */

export default [
  [/I browse "([^"]*)"/, setBaseURL],
  [/I am on (?:|the )homepage/, goRoot],
  [/I go to (?:|the )homepage/, goRoot],
  [/I am on "([^"]*)"/, goTo],
  [/I go to "([^"]*)"/, goTo],
  [/I reload the page/, refresh],
  [/I move backward one page/, goBack],
];
