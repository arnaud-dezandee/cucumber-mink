import Mink from '../src/mink.js';

// BrowserStack
const parameters = {
  driver: {
    desiredCapabilities: {
      'browserstack.local': true,
      'browserstack.debug': true,
      'browser': 'Safari',
      'browser_version': '8.0',
      'os': 'OS X',
      'os_version': 'Yosemite',
      'resolution': '1280x1024',
    },
    host: 'hub.browserstack.com',
    port: 80,
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    logLevel: 'silent',
  },
};

export default function () {
  Mink.init(this, parameters);
}
