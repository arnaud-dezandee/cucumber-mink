module.exports = function (zBrowser) {
  // Object initialisation
  var that = {
    browser: zBrowser
  };

  /////////////////// Private Methods

  function end(callback) {
    zBrowser.closeAll();
    callback();
  }

  /////////////////// Revealing public methods

  that.end = end;

  return that;
};
