/**
 * Dependencies
 */

import action from './action.js';
import assertDOM from './assert_dom.js';
import assertForm from './assert_form.js';
import assertURL from './assert_url.js';
import form from './form.js';
import navigation from './navigation.js';
import utility from './utility.js';

/**
 * Interface
 */

export default [
  ...action,
  ...assertDOM,
  ...assertForm,
  ...assertURL,
  ...form,
  ...navigation,
  ...utility,
];
