const cucumber = require('cucumber');
const mink = require('../../../src/mink.js');

mink.gherkin(cucumber);

const driver = new mink.Mink({
  selectors: { 'Blogpost Teaser': 'section.post' },
});
driver.hook(cucumber);
