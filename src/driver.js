/**
 * Dependencies
 */

import url from 'url';
import Promise from 'bluebird';
import WebDriverIO from 'webdriverio';
import detectSeries from './utils/detect_series.js';

/**
 * Interface
 */

export default class Driver {
  constructor(parameters) {
    this.parameters = parameters;
    this.client = WebDriverIO.remote(parameters);
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
    return this.client.getHTML(selector);
  }

  url(input) {
    if (!input) {
      return this.client.getUrl().then(text => {
        return url.parse(text);
      });
    }
    return this.client.url(input);
  }

  sendKey(selector, key) {
    return this.client.click(selector).then(() => {
      return this.client.keys(key);
    });
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
    return this.elements(selector)
    .then(items => Promise.filter(items, WebElement => {
      return this.client.elementIdText(WebElement.ELEMENT).then(result => {
        return result.value === text;
      });
    }));
  }

  elementsWithValue(selector, value) {
    return this.elements(selector)
    .then(items => Promise.filter(items, WebElement => {
      return this.client.elementIdAttribute(WebElement.ELEMENT, 'value').then(result => {
        return result.value === value;
      });
    }));
  }

  button(mixed) {
    return detectSeries(
      [
        () => this.elements(mixed).catch(() => null),
        () => this.elementsWithText('button', mixed),
        () => this.elementsWithValue('input[type=submit]', mixed),
      ],
      fn => fn(),
      WebElements => !!WebElements.length
    ).then(({ result }) => {
      if (!result) throw new Error('Button not found !');
      return result[0];
    });
  }

  link(mixed) {
    return detectSeries(
      [
        () => this.elements(mixed).catch(() => null),
        () => this.elementsWithText('body a', mixed),
      ],
      fn => fn(),
      WebElements => !!WebElements.length
    ).then(({ result }) => {
      if (!result) throw new Error('Link not found !');
      return result[0];
    });
  }
}

// WebDriverIO client symlinks
[
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
].forEach(method => {
  Driver.prototype[method] = function (...args) {
    return this.client[method].apply(null, args);
  };
});

// Aliases
Driver.prototype.isChecked = Driver.prototype.isSelected;
Driver.prototype.check = Driver.prototype.click;
Driver.prototype.uncheck = Driver.prototype.click;
Driver.prototype.hover = Driver.prototype.moveToObject;
Driver.prototype.setViewportSize = Driver.prototype.windowHandleSize;
