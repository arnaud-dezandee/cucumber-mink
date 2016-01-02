import Mink from '../src/mink.js';

// Local Chrome
const parameters = {
  driver: {
    logLevel: 'silent',
    desiredCapabilities: {
      browserName: 'firefox',
    },
    port: 4444,
  },
};

export default function () {
  Mink.init(this, parameters);
}
