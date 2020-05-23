const dbg = require('debug');
const Promise = require('bluebird');
const puppeteer = require('puppeteer');
const defaultsDeep = require('lodash.defaultsdeep');

const detectSeries = require('./utils/detect_series.js');
const definitions = require('./step_definitions/index.js');

const debug = dbg('mink');

const DEFAULT_CONFIG = {
  baseUrl: process.env.BASE_URL,
  viewport: {
    width: 1366,
    height: 768,
  },
  headless: process.env.RUN_HEADLESS !== '0',
  devtools: process.env.RUN_DEVTOOLS === '1',
  selectors: {},
};

function gherkin(cucumber) {
  definitions.forEach(([pattern, fn]) => {
    cucumber.defineStep(pattern, fn);
  });
}

function Mink(config = {}) {
  this.config = defaultsDeep(config, DEFAULT_CONFIG);
}

Mink.prototype.hook = function (cucumber) {
  const self = this;
  cucumber.BeforeAll(() => self.setup());
  cucumber.AfterAll(() => self.cleanup());
  cucumber.setWorldConstructor(function () {
    this.mink = self;
  });
};
Mink.prototype.setup = async function () {
  this.browser = await puppeteer.launch({
    headless: this.config.headless && !this.config.devtools,
    devtools: this.config.devtools,
  });
  this.page = await this.browser.newPage();
  return this.page.setViewport(this.config.viewport);
};
Mink.prototype.cleanup = async function () {
  if (this.browser) {
    await this.browser.close();
  }
};

// Driver methods
Mink.prototype.html = function (selector) {
  if (!selector) {
    return this.page.content();
  }
  /* istanbul ignore next */
  return this.page.$$eval(selector, (elements) => {
    return elements.map((x) => x.outerHTML).join('');
  });
};

Mink.prototype.text = function (selector) {
  /* istanbul ignore next */
  return this.page.$$eval(selector, (elements) => {
    return elements.map((x) => x.outerText).join('');
  });
};

Mink.prototype.count = function (selector) {
  /* istanbul ignore next */
  return this.page.$$eval(selector, (elements) => {
    return elements.length;
  });
};

Mink.prototype.elementsWithText = function (selector, text, exact = true) {
  const self = this;
  return self.page.$$(selector).then((items) => Promise.filter(items, (handle) => {
    /* istanbul ignore next */
    return self.page.evaluate((obj) => obj.innerText, handle)
      .then((res) => {
        if (exact) {
          return res.toUpperCase() === text.toUpperCase();
        }
        return res.toUpperCase().indexOf(text.toUpperCase()) >= 0;
      });
  }));
};

Mink.prototype.elementsWithValue = function (selector, text) {
  const self = this;
  return self.page.$$(selector).then((items) => Promise.filter(items, (handle) => {
    /* istanbul ignore next */
    return self.page.evaluate((obj) => obj.value, handle)
      .then((res) => res.toUpperCase() === text.toUpperCase());
  }));
};

Mink.prototype.button = function (mixed) {
  const arr = [
    () => Promise
      .try(() => this.page.$$(mixed))
      .catch((err) => { debug(err); return []; }),
    () => this.elementsWithText('button', mixed),
    () => this.elementsWithValue('input[type=submit]', mixed),
  ];
  return detectSeries(arr, (fn) => fn(), (WebElements) => !!WebElements.length)
    .then(({ result }) => {
      if (!result) throw new Error('Button not found !');
      return result[0];
    });
};

Mink.prototype.link = function (mixed) {
  const arr = [
    () => Promise
      .try(() => this.page.$$(mixed))
      .catch((err) => { debug(err); return []; }),
    () => this.elementsWithText('a', mixed, true),
    () => this.elementsWithText('a', mixed, false),
  ];
  return detectSeries(arr, (fn) => fn(), (WebElements) => !!WebElements.length)
    .then(({ result }) => {
      if (!result) throw new Error('Link not found !');
      return result[0];
    });
};

Mink.prototype.getSelector = function (key) {
  return (key in this.config.selectors) ? this.config.selectors[key] : key;
};

module.exports.Mink = Mink;
module.exports.gherkin = gherkin;
