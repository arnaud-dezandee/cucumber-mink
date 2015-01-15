module.exports = function (client, Driver) {
  Driver = Driver || { client: client };

  function _stateFunc(sFunc, sSelector, callback) {
    client[sFunc](sSelector, function (err, bool) {
      if (err) { callback(err); }
      else {
        callback(null, bool);
      }
    });
  }

  Driver.isEnabled = function(sSelector, callback) {
    _stateFunc('isEnabled', sSelector, callback);
  };
  Driver.isExisting = function(sSelector, callback) {
    _stateFunc('isExisting', sSelector, callback);
  };
  Driver.isSelected = function(sSelector, callback) {
    _stateFunc('isSelected', sSelector, callback);
  };
  Driver.isVisible = function(sSelector, callback) {
    _stateFunc('isVisible', sSelector, callback);
  };

  Driver.isChecked = Driver.isSelected;

  return Driver;
};
