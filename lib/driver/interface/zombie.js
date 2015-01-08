var _   = require('lodash'),
    url = require('url');

////////////////////////////

module.exports = function (zBrowser) {
  // Object initialisation
  var that = {
    browser: zBrowser
  };

  /////////////////// Private Methods

  function init(callback) {
    callback();
  }

  function ready(callback) {
    callback();
  }

  function end(callback) {
    zBrowser.close();
    callback();
  }

  function browseUrl(sUrl, callback) {
    zBrowser.visit(sUrl, function (error) {
      if (error) { throw error; }
      else {
        callback();
      }
    });
  }

  function currentUrl(callback) {
    callback(null, url.parse(zBrowser.location.href));
  }

  function reload(callback) {
    zBrowser.reload(function (error) {
      if (error) { throw error; }
      else {
        callback();
      }
    });
  }

  function back(callback) {
    zBrowser.back(function (error) {
      if (error) { throw error; }
      else {
        callback();
      }
    });
  }

  function click(sSelector, callback) {
    zBrowser.click(sSelector, callback);
  }

  function html(sSelector, callback) {
    if (!callback && _.isFunction(sSelector)) {
      callback = sSelector;
      sSelector = null;

      callback(null, zBrowser.html());
    } else {
      callback(null, zBrowser.html(sSelector));
    }
  }

  function text(sSelector, callback) {
    callback(null, zBrowser.text(sSelector));
  }

  function element(sSelector, callback) {
    callback(null, zBrowser.query(sSelector));
  }

  function elements(sSelector, callback) {
    callback(null, zBrowser.queryAll(sSelector));
  }

  function getValue(sSelector, callback) {
    var fieldNode = zBrowser.field(sSelector);
    callback(null, fieldNode.value);
  }

  function setValue(sSelector, value, callback) {
    zBrowser.fill(sSelector, value);
    callback();
  }

  function check(sSelector, callback) {
    zBrowser.check(sSelector);
    callback();
  }

  function uncheck(sSelector, callback) {
    zBrowser.uncheck(sSelector);
    callback();
  }

  function isChecked(sSelector, callback) {
    var checkboxNode = zBrowser.field(sSelector);
    callback(null, checkboxNode.checked);
  }

  function selectOption(sSelectSelector, sOption, callback) {
    zBrowser.select(sSelectSelector, sOption);
    callback();
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
  that.check        = check;
  that.uncheck      = uncheck;

  return that;
};
