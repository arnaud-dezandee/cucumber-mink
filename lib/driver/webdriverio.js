var _   = require('lodash'),
    url = require('url');

var state   = require('./lib/state');
var action  = require('./lib/action');

////////////////////////////

module.exports.init = function (client, Driver) {
  // Object initialisation
  Driver = Driver || { client: client };
  Driver = state(client, Driver);
  Driver = action(client, Driver);

  Driver.init = function(callback) {
    client.init().call(callback);
  };

  Driver.ready = function(callback) {
    client.call(callback);
  };

  Driver.end = function(callback) {
    client.end().call(callback);
  };

  Driver.browseUrl = function(sUrl, callback) {
    client.url(sUrl).call(callback);
  };

  Driver.currentUrl = function(callback) {
    client.url(function (err, res) {
      if (err) { callback(err); }
      else {
        callback(null, url.parse(res.value));
      }
    });
  };

  Driver.refresh = function(callback) {
    client.refresh().call(callback);
  };

  Driver.back = function(callback) {
    client.back().call(callback);
  };

  Driver.html = function(sSelector, callback) {
    if (!callback && _.isFunction(sSelector)) {
      callback = sSelector;
      sSelector = null;

      client.getSource(function (err, source) {
        if (err) { callback(err); }
        else {
          callback(null, source);
        }
      });
    } else {
      client.getHTML(sSelector, function (err, html) {
        if (err) { callback(err); }
        else {
          callback(null, html);
        }
      });
    }
  };

  Driver.text = function(sSelector, callback) {
    client.getText(sSelector, function (err, text) {
      if (err) { callback(err); }
      else {
        callback(null, text);
      }
    });
  };

  Driver.element = function(sSelector, callback) {
    client.element(sSelector, function (err, res) {
      if (err) { callback(err); }
      else {
        callback(null, res.value);
      }
    });
  };

  Driver.elements = function(sSelector, callback) {
    client.elements(sSelector, function (err, res) {
      if (err) { callback(err); }
      else {
        callback(null, res.value);
      }
    });
  };

  Driver.getValue = function(sSelector, callback) {
    client.getValue(sSelector, function (err, value) {
      if (err) { callback(err); }
      else {
        callback(null, value);
      }
    });
  };

  Driver.setViewportSize = function(oSize, callback) {
    client.setViewportSize(oSize).call(callback);
  };

  Driver.saveScreenshot = function(fileName, callback) {
    client.saveScreenshot(fileName).call(callback);
  };

  return Driver;
};
