const Errors = require('../utils/errors.js');

const click = function (selector) {
  selector = this.mink.getSelector(selector);
  return this.mink.page.click(selector);
};

const hover = function (selector) {
  selector = this.mink.getSelector(selector);
  return this.mink.page.hover(selector);
};

const submit = function (selector) {
  selector = this.mink.getSelector(selector);
  const self = this;
  /* istanbul ignore next */
  return Promise.all([
    self.mink.page.waitForNavigation(),
    self.mink.page.$eval(selector, (elem) => {
      const form = elem.form || elem;
      form.submit();
    }),
  ]);
};

const press = function (selector) {
  selector = this.mink.getSelector(selector);
  const self = this;
  return this.mink.button(selector).then((item) => {
    if (!item) throw new Error(Errors.ACTION.CLICK_BUTTON);
    return Promise.all([
      self.mink.page.waitForNavigation(),
      item.click(),
    ]).then(() => item.dispose());
  });
};

const follow = function (selector) {
  selector = this.mink.getSelector(selector);
  const self = this;
  return this.mink.link(selector).then((item) => {
    if (!item) throw new Error(Errors.ACTION.CLICK_LINK);
    return Promise.all([
      self.mink.page.waitForNavigation(),
      item.click(),
    ]).then(() => item.dispose());
  });
};

const sendKey = function (key, selector) {
  selector = this.mink.getSelector(selector);
  return this.mink.page.$(selector).then((handle) => {
    return handle.press(key).then(() => {
      handle.dispose();
    });
  });
};

module.exports = [
  [/^(?:|I )click on "([^"]*)"/, click],
  [/^(?:|I )press "([^"]*)"/, press],
  [/^(?:|I )follow "([^"]*)"/, follow],
  [/^(?:|I )hover "([^"]*)" element/, hover],
  [/^(?:|I )submit "([^"]*)" form/, submit],
  [/^(?:|I )send key "([^"]*)" in "([^"]*)" element/, sendKey],
];
