var _   = require('lodash'),
    url = require('url');

module.exports = function (client) {
  // Object initialisation
  var that = {
    client: client
  };

  /////////////////// Private Methods

  function init(callback) {
    client.init().call(callback);
  }

  function ready(callback) {
    client.call(callback);
  }

  function end(callback) {
    client.end().call(callback);
  }

  function browseUrl(sUrl, callback) {
    client.url(sUrl).call(callback);
  }

  function currentUrl(callback) {
    client.url(function (err, res) {
      if (err) { callback(err); }
      else {
        callback(null, url.parse(res.value));
      }
    });
  }

  function reload(callback) {
    client.refresh().call(callback);
  }

  function back(callback) {
    client.back().call(callback);
  }

  function click(sSelector, callback) {
    client.click(sSelector).call(callback);
  }

  function html(sSelector, callback) {
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
  }

  function element(sSelector, callback) {
    client.element(sSelector, function (err, res) {
      if (err) { callback(err); }
      else {
        callback(null, res.value);
      }
    });
  }

  function elements(sSelector, callback) {
    client.elements(sSelector, function (err, res) {
      if (err) { callback(err); }
      else {
        callback(null, res.value);
      }
    });
  }

  /////////////////// Revealing public methods

  that.init       = init;
  that.ready      = ready;
  that.end        = end;
  that.browseUrl  = browseUrl;
  that.currentUrl = currentUrl;
  that.back       = back;
  that.reload     = reload;
  that.click      = click;
  that.html       = html;
  that.element    = element;
  that.elements   = elements;

  return that;
};
