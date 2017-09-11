/**
 * Dependencies
 */

const url = require('url');
const Promise = require('bluebird');
const dbg = require('debug');
const detectSeries = require('../utils/detect_series.js');

/**
 * WebDriverIO 4.8.0 outputs all kinds of "deprecation" warnings
 * for common commands like `keys` and `moveToObject`.
 * According to https://github.com/Codeception/CodeceptJS/issues/531,
 * these deprecation warnings are for Firefox, and have no alternative replacements.
 * Since we can't downgrade WDIO as suggested (it's Spectron's dep, not ours),
 * we must suppress the warning with a classic monkey-patch.
 *
 * @see webdriverio/lib/helpers/depcrecationWarning.js
 */
// Filter out the following messages:
const wdioDeprecationWarning = /^WARNING: the "\w+" command will be depcrecated soon./; // [sic]
// Monkey patch:
const { warn } = console;
console.warn = function suppressWebdriverWarnings(...args) {
  if (args[0].match(wdioDeprecationWarning)) return;
  warn.apply(console, args);
};

/**
 * Private
 */

const debug = dbg('mink:webdriverio');

/**
 * Interface
 */

class WdIODriver {
  constructor(parameters) {
    this.parameters = parameters;
    this.client = require('webdriverio').remote(parameters);

    this.baseUrl = parameters.baseUrl;
  }

  click(selector) {
    if (typeof selector === 'object' && selector.ELEMENT) {
      return this.client.elementIdClick(selector.ELEMENT);
    }
    return this.client.click(selector);
  }

  html(selector) {
    if (!selector) {
      return this.client.getSource();
    }
    return this.client.getHTML(selector).then((item) => {
      if (Array.isArray(item)) return item.join('');
      return item;
    });
  }

  text(selector) {
    return this.client.getText(selector).then((item) => {
      if (Array.isArray(item)) return item.join('');
      return item;
    });
  }

  url(input) {
    if (!input) {
      return this.client.getUrl()
        .then(text => url.parse(text));
    }
    return this.client.url(input);
  }

  sendKey(selector, key) {
    return this.client.click(selector)
      .then(() => this.client.keys(key));
  }

  elements(selector) {
    return this.client.elements(selector)
      .then(response => response.value);
  }

  elementsCount(selector) {
    return this.elements(selector)
      .then(items => items.length);
  }

  elementsWithText(selector, text) {
    return Promise.try(() => this.elements(selector))
      .then(items => Promise.filter(items, WebElement => (
        this.client
          .elementIdText(WebElement.ELEMENT)
          .then(result => result.value.toUpperCase() === text.toUpperCase())
      )));
  }

  elementsWithValue(selector, value) {
    return Promise.try(() => this.elements(selector))
      .then(items => Promise.filter(items, WebElement => (
        this.client
          .elementIdAttribute(WebElement.ELEMENT, 'value')
          .then(result => result.value.toUpperCase() === value.toUpperCase())
      )));
  }

  button(mixed) {
    const arr = [
      () => Promise
        .try(() => this.elements(mixed))
        .catch((err) => { debug(err); return []; }),
      () => this.elementsWithText('button', mixed),
      () => this.elementsWithValue('input[type=submit]', mixed),
    ];
    return detectSeries(arr, fn => fn(), WebElements => !!WebElements.length)
      .then(({ result }) => {
        if (!result) throw new Error('Button not found !');
        return result[0];
      });
  }

  link(mixed) {
    const arr = [
      () => Promise
        .try(() => this.elements(mixed))
        .catch((err) => { debug(err); return []; }),
      () => this.elementsWithText('a', mixed),
    ];
    return detectSeries(arr, fn => fn(), WebElements => !!WebElements.length)
      .then(({ result }) => {
        if (!result) throw new Error('Link not found !');
        return result[0];
      });
  }
}

// WebDriverIO client symlinks
([
  'init',
  'refresh',
  'back',
  'end',
  'setValue',
  'selectByVisibleText',
  'submitForm',
  'windowHandleSize',
  'saveScreenshot',
  'getValue',
  'moveToObject',
  'isEnabled',
  'isExisting',
  'isSelected',
  'isVisible',
]).forEach((method) => {
  WdIODriver.prototype[method] = function (...args) {
    return Promise.resolve(this.client[method].apply(this, args));
  };
});

// Aliases
WdIODriver.prototype.isChecked = WdIODriver.prototype.isSelected;
WdIODriver.prototype.check = WdIODriver.prototype.click;
WdIODriver.prototype.uncheck = WdIODriver.prototype.click;
WdIODriver.prototype.hover = WdIODriver.prototype.moveToObject;
WdIODriver.prototype.setViewportSize = WdIODriver.prototype.windowHandleSize;

module.exports = WdIODriver;
