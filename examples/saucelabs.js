import Mink from '../src/mink.js';

// SauceLabs
const parameters = {
  driver: {
    desiredCapabilities: {
      browserName: 'chrome',
      version: '27',
      platform: 'XP',
      tags: ['examples'],
      name: 'This is an example test',
    },
    host: 'ondemand.saucelabs.com',
    port: 80,
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    logLevel: 'silent',
  },
};

export default function () {
  Mink.init(this, parameters);
}
