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
  puppeteer: {
    headless: process.env.RUN_HEADLESS !== '0',
    devtools: process.env.RUN_DEVTOOLS === '1',
  },
  selectors: {},
};

function gherkin(cucumber) {
  definitions.forEach(([pattern, fn]) => {
    cucumber.defineStep(pattern, fn);
  });
}

class Mink {
  constructor(config = {}) {
    this.config = defaultsDeep(config, DEFAULT_CONFIG);
  }

  hook(cucumber) {
    const self = this;
    cucumber.BeforeAll(() => self.setup());
    cucumber.AfterAll(() => self.cleanup());
    cucumber.setWorldConstructor(function () {
      this.mink = self;
    });
  }

  async setup() {
    this.browser = await puppeteer.launch(this.config.puppeteer);
    this.page = await this.browser.newPage();
    return this.page.setViewport(this.config.viewport);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
    }
  }

  // Driver methods
  html(selector) {
    if (!selector) {
      return this.page.content();
    }
    /* istanbul ignore next */
    return this.page.$$eval(selector, elements => {
      return elements.map(x => x.outerHTML).join('');
    });
  }

  text(selector) {
    /* istanbul ignore next */
    return this.page.$$eval(selector, elements => {
      return elements.map(x => x.outerText).join('');
    });
  }

  count(selector) {
    /* istanbul ignore next */
    return this.page.$$eval(selector, elements => {
      return elements.length;
    });
  }

  async elementsWithText(selector, text, exact = true) {
    const self = this;
    const items = await self.page.$$(selector);
    return await Promise.filter(items, handle => {
      /* istanbul ignore next */
      return self.page
        .evaluate(obj => obj.innerText, handle)
        .then(res => {
          if (exact) {
            return res.toUpperCase() === text.toUpperCase();
          }
          return res.toUpperCase().indexOf(text.toUpperCase()) >= 0;
        });
    });
  }

  async elementsWithValue(selector, text) {
    const self = this;
    const items = await self.page.$$(selector);
    return await Promise.filter(items, async handle => {
      /* istanbul ignore next */
      const res = await self.page.evaluate(obj => obj.value, handle);
      return res.toUpperCase() === text.toUpperCase();
    });
  }

  async button(mixed) {
    const arr = [
      () =>
        Promise.try(() => this.page.$$(mixed)).catch(err => {
          debug(err);
          return [];
        }),
      () => this.elementsWithText('button', mixed),
      () => this.elementsWithValue('input[type=submit]', mixed),
    ];
    const { result } = await detectSeries(
      arr,
      fn_1 => fn_1(),
      WebElements => !!WebElements.length,
    );
    if (!result) throw new Error('Button not found !');
    return result[0];
  }

  async link(mixed) {
    const arr = [
      () =>
        Promise.try(() => this.page.$$(mixed)).catch(err => {
          debug(err);
          return [];
        }),
      () => this.elementsWithText('a', mixed, true),
      () => this.elementsWithText('a', mixed, false),
    ];
    const { result } = await detectSeries(
      arr,
      fn_1 => fn_1(),
      WebElements => !!WebElements.length,
    );
    if (!result) throw new Error('Link not found !');
    return result[0];
  }

  getSelector(key) {
    return key in this.config.selectors ? this.config.selectors[key] : key;
  }
}

module.exports.Mink = Mink;
module.exports.gherkin = gherkin;
