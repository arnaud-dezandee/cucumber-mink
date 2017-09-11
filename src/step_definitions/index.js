/**
 * Dependencies
 */

const action = require('./action.js');
const assertDOM = require('./assert_dom.js');
const assertForm = require('./assert_form.js');
const assertURL = require('./assert_url.js');
const form = require('./form.js');
const navigation = require('./navigation.js');
const utility = require('./utility.js');

/**
 * Interface
 */

module.exports = [
  ...action,
  ...assertDOM,
  ...assertForm,
  ...assertURL,
  ...form,
  ...navigation,
  ...utility,
];
