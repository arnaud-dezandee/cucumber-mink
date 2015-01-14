module.exports = function (client, Driver) {
  Driver = Driver || { client: client };

  Driver.click = function(sSelector, callback) {
    client
      .click(sSelector)
      .call(callback);
  };

  Driver.check    = Driver.click;
  Driver.uncheck  = Driver.click;

  Driver.selectByVisibleText = function(sSelectSelector, sOption, callback) {
    client
      .selectByVisibleText(sSelectSelector, sOption)
      .call(callback);
  };

  Driver.setValue = function(sSelector, value, callback) {
    client
      .setValue(sSelector, value)
      .call(callback);
  };

  return Driver;
};
