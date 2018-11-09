const Promise = require('bluebird');

const viewport = function (width, height) {
  return this.mink.page.setViewport({
    width: parseInt(width, 10),
    height: parseInt(height, 10),
  });
};

const wait = function (seconds) {
  return Promise.delay(parseInt(seconds, 10) * 1000);
};

const screenshot = function () {
  return this.mink.page.screenshot({
    path: './screenshot.png',
  });
};

module.exports = [
  [/^(?:|I )wait (\d+) seconds?/, wait],
  [/the viewport is (\d+)px width and (\d+)px height/, viewport],
  [/^(?:|I )take a screenshot/, screenshot],
];
