/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */
var Errors = require('../../utils/errors.js');

///////////////////

function action(method) {
  return function(selector, callback) {
    this.driver[method](selector, callback);
  };
}

function click(method, errMessage) {
  return function(mixed, callback) {
    var Driver = this.driver;
    Driver[method](mixed, function (err, WebElement) {
      if (err || !WebElement) {
        callback(new Error([errMessage, mixed].join(' ')));
      } else {
        Driver.click(WebElement, callback);
      }
    });
  };
}

function sendKey(key, selector, callback) {
  this.driver.sendKey(selector, key, callback);
}

///////////////////

module.exports = {
  click:  action('click'),
  hover:  action('hover'),
  submit: action('submitForm'),
  follow: click('link', Errors.ACTION.CLICK_LINK),
  press:  click('button', Errors.ACTION.CLICK_BUTTON),
  key:    sendKey
};
