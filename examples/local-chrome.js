import Mink from '../src/mink.js';

// Local Chrome
const parameters = {
  driver: {
    logLevel: 'silent',
    desiredCapabilities: {
      browserName: 'chrome',
    },
    port: 9515,
  },
};

export default function () {
  Mink.init(this, parameters);
}
