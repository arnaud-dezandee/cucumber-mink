/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/*global window, document, angular*/
var debug = require('debug')('mink:driver:angular');

/**
 * Wait for Angular, extracted from Protractor sources.
 * @param {String} selector ng-app element
 * @param {Function} callback
 */
module.exports = function waitForAngular(selector, callback) {
  this.client
    .timeoutsAsyncScript(2000)
    .executeAsync(
      function(rootSelector, cb) {
        if (!window || !document) {
          cb(new Error('window / document not initialized').message);
        }
        var el = document.querySelector(rootSelector);
        if (!window.angular) {
          cb(new Error('angular could not be found on the window').message);
        }
        if (angular.getTestability) {
          angular.getTestability(el).whenStable(cb);
        } else {
          if (!angular.element(el).injector()) {
            cb(new Error('root element (' + rootSelector + ') has no injector.' + ' this may mean it is not inside ng-app.').message);
          }
          angular.element(el).injector().get('$browser').notifyWhenNoOutstandingRequests(cb);
        }
      },
      selector
    )
    .then(debug)
    .call(callback);
};
