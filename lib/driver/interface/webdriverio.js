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

  function text(sSelector, callback) {
    client.getText(sSelector, function (err, text) {
      if (err) { callback(err); }
      else {
        callback(null, text);
      }
    });
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

  function getValue(sSelector, callback) {
    client.getValue(sSelector, function (err, value) {
      if (err) { callback(err); }
      else {
        callback(null, value);
      }
    });
  }

  function setValue(sSelector, value, callback) {
    client
      .setValue(sSelector, value)
      .call(callback);
  }

  function isChecked(sSelector, callback) {
    client.isSelected(sSelector, function (err, bool) {
      if (err) { callback(err); }
      else {
        callback(null, bool);
      }
    });
  }

  function selectOption(sSelectSelector, sOption, callback) {
    client
      .selectByVisibleText(sSelectSelector, sOption)
      .call(callback);
  }

  /////////////////// Revealing public methods

  that.init         = init;
  that.ready        = ready;
  that.end          = end;
  that.back         = back;
  that.browseUrl    = browseUrl;
  that.currentUrl   = currentUrl;
  that.click        = click;
  that.reload       = reload;
  that.html         = html;
  that.text         = text;
  that.element      = element;
  that.elements     = elements;
  that.isChecked    = isChecked;
  that.getValue     = getValue;
  that.setValue     = setValue;
  that.selectOption = selectOption;

  return that;
};
