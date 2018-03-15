const cucumber = require('cucumber');
const mink = require('../../../src/mink.js');

mink.gherkin(cucumber);

const driver = new mink.Mink();
driver.hook(cucumber);
