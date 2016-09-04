/**
 * Dependencies
 */

import fs from 'fs';
import url from 'url';
import Promise from 'bluebird';
import dbg from 'debug';
import detectSeries from '../utils/detect_series.js';

/**
 * Private
 */

const debug = dbg('mink:protractor');

/* eslint-disable quote-props */
const UNICODE_CHARACTERS = {
  'NULL': '\uE000',
  'Cancel': '\uE001',
  'Help': '\uE002',
  'Back space': '\uE003',
  'Tab': '\uE004',
  'Clear': '\uE005',
  'Return': '\uE006',
  'Enter': '\uE007',
  'Shift': '\uE008',
  'Control': '\uE009',
  'Alt': '\uE00A',
  'Pause': '\uE00B',
  'Escape': '\uE00C',
  'Space': '\uE00D',
  'Pageup': '\uE00E',
  'Page_Up': '\uE00E',
  'Pagedown': '\uE00F',
  'Page_Down': '\uE00F',
  'End': '\uE010',
  'Home': '\uE011',
  'Left arrow': '\uE012',
  'Arrow_Left': '\uE012',
  'Up arrow': '\uE013',
  'Arrow_Up': '\uE013',
  'Right arrow': '\uE014',
  'Arrow_Right': '\uE014',
  'Down arrow': '\uE015',
  'Arrow_Down': '\uE015',
  'Insert': '\uE016',
  'Delete': '\uE017',
  'Semicolon': '\uE018',
  'Equals': '\uE019',
  'Numpad 0': '\uE01A',
  'Numpad 1': '\uE01B',
  'Numpad 2': '\uE01C',
  'Numpad 3': '\uE01D',
  'Numpad 4': '\uE01E',
  'Numpad 5': '\uE01F',
  'Numpad 6': '\uE020',
  'Numpad 7': '\uE021',
  'Numpad 8': '\uE022',
  'Numpad 9': '\uE023',
  'Multiply': '\uE024',
  'Add': '\uE025',
  'Separator': '\uE026',
  'Subtract': '\uE027',
  'Decimal': '\uE028',
  'Divide': '\uE029',
  'F1': '\uE031',
  'F2': '\uE032',
  'F3': '\uE033',
  'F4': '\uE034',
  'F5': '\uE035',
  'F6': '\uE036',
  'F7': '\uE037',
  'F8': '\uE038',
  'F9': '\uE039',
  'F10': '\uE03A',
  'F11': '\uE03B',
  'F12': '\uE03C',
  'Command': '\uE03D',
  'Meta': '\uE03D',
  'Zenkaku_Hankaku': '\uE040',
};

const checkUnicode = (value) => (
  {}.hasOwnProperty.call(UNICODE_CHARACTERS, value)
    ? [UNICODE_CHARACTERS[value]]
    : value.split('')
);

/**
 * Interface
 */

export default class ProtractorDriver {
  constructor(parameters) {
    this.parameters = parameters;
    this.browser = global.browser;
    this.by = global.By;

    Object.defineProperty(this, 'baseUrl', {
      set(str) { this.browser.baseUrl = str; },
      get() { return this.browser.baseUrl; },
    });
  }

  click(selector) {
    if (typeof selector === 'object' && selector.getId) {
      return selector.click();
    }
    const locator = this.by.css(selector);
    return this.browser.element(locator).click();
  }

  html(selector) {
    if (selector) {
      const locator = this.by.css(selector);
      return this.browser.element.all(locator)
        .map(el => el.getOuterHtml())
        .then(item => {
          if (Array.isArray(item)) return item.join('');
          return item;
        });
    }
    return this.browser.getPageSource();
  }

  text(selector) {
    const locator = this.by.css(selector);
    return this.browser.element.all(locator)
      .map(el => el.getText())
      .then(item => {
        if (Array.isArray(item)) return item.join('');
        return item;
      });
  }

  url(input) {
    if (input) {
      return this.browser.get(input);
    }
    return this.browser.getCurrentUrl().then(str => (
      url.parse(str)
    ));
  }

  sendKey(selector, key) {
    let keys = [];
    if (typeof key === 'string') {
      keys = checkUnicode(key);
    } else if (key instanceof Array) {
      keys = key.reduce((acc, it) => acc.concat(checkUnicode(it)), []);
    }
    const locator = this.by.css(selector);
    return this.browser.findElement(locator).then((el) => (
      el.click().then(() => el.sendKeys(...keys))
    ));
  }

  elements(selector) {
    const locator = this.by.css(selector);
    return this.browser.findElements(locator);
  }

  elementsCount(selector) {
    return this.elements(selector).then(items => items.length);
  }

  elementsWithText(selector, text) {
    return this.elements(selector)
    .then(items => Promise.filter(items, el =>
      el.getText().then(result => result === text)
    ));
  }

  elementsWithValue(selector, value) {
    return this.elements(selector)
    .then(items => Promise.filter(items, el =>
      el.getAttribute('value').then(result => result === value)
    ));
  }

  button(mixed) {
    return detectSeries(
      [
        () => this.elements(mixed).catch(err => {
          debug(err);
          return [];
        }),
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
        () => this.elements(mixed).catch(err => {
          debug(err);
          return [];
        }),
        () => this.elementsWithText('body a', mixed),
      ],
      fn => fn(),
      WebElements => !!WebElements.length
    ).then(({ result }) => {
      if (!result) throw new Error('Link not found !');
      return result[0];
    });
  }

  refresh() {
    return this.browser.navigate().refresh();
  }

  back() {
    return this.browser.navigate().back();
  }

  setValue(selector, value) {
    const locator = this.by.css(selector);
    return this.browser.findElement(locator).then(el => (
      el.clear().then(() => el.sendKeys(value))
    ));
  }

  selectByVisibleText(selector, text) {
    const $select = this.browser.element(this.by.css(selector));
    const $option = $select.element(this.by.cssContainingText('option', text));
    return $select.click().then(() => $option.click());
  }

  submitForm(selector) {
    const locator = this.by.css(selector);
    return this.browser.element(locator).submit();
  }

  setViewportSize({ width, height }) {
    return this.browser.manage().window().setSize(width, height);
  }

  saveScreenshot(filename) {
    return this.browser.takeScreenshot().then(png => {
      const screenshot = new Buffer(png, 'base64');
      if (typeof filename === 'string') {
        fs.writeFileSync(filename, screenshot);
      }
      return screenshot;
    });
  }

  getValue(selector) {
    const locator = this.by.css(selector);
    return this.browser.element(locator).getAttribute('value');
  }

  hover(selector) {
    const locator = this.by.css(selector);
    return this.browser.findElement(locator).then(el => (
      this.browser.actions().mouseMove(el).perform()
    ));
  }

  isEnabled(selector) {
    const locator = this.by.css(selector);
    return this.browser.element(locator).isEnabled();
  }

  isExisting(selector) {
    const locator = this.by.css(selector);
    return this.browser.element(locator).isPresent();
  }

  isSelected(selector) {
    const locator = this.by.css(selector);
    return this.browser.element(locator).isSelected();
  }

  isVisible(selector) {
    const locator = this.by.css(selector);
    return this.browser.element(locator).isDisplayed();
  }

  init() {
    // Handled by protractor, no-op
    return Promise.resolve();
  }

  end() {
    // Handled by protractor, no-op
    return Promise.resolve();
  }
}

// Aliases
ProtractorDriver.prototype.isChecked = ProtractorDriver.prototype.isSelected;
ProtractorDriver.prototype.check = ProtractorDriver.prototype.click;
ProtractorDriver.prototype.uncheck = ProtractorDriver.prototype.click;
