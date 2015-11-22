/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

/**
 * Return link element matching either selector or content
 * @param {String} mixed         selector or content
 * @param {Function} callback
 */
var detectSeries = require('../../utils/detect-series');
var debug = require('debug')('mink:driver:link');
var _ = require('lodash');

module.exports = function link(mixed, callback) {
  var Driver = this;

  detectSeries(
    [
      function(cb) {
        Driver.elements(mixed, function(err, elements) {
          if (err) { return cb(null); }
          cb(null, elements);
        });
      },
      function(cb) {
        Driver.elementsWithText('body a', mixed, cb);
      }
    ],
    function(fn, cb) {
      fn(function(err, WebElements) {
        /* istanbul ignore if */
        if (err) {
          debug(err);
          return cb(false);
        }
        cb(!_.isEmpty(WebElements), WebElements);
      });
    },
    function(result) {
      if (!result) {
        callback(new Error('Link not found !'));
      } else {
        callback(null, _.first(result));
      }
    }
  );
};
