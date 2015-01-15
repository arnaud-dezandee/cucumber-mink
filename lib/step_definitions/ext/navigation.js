var url = require('url');

///////////////////

var Navigation = module.exports = {};

///////////////////

Navigation.root = function(Driver, callback) {
  if (! Driver.baseUrl) {
    callback.fail(new Error('Please provide a base url to use root functions !'));
  } else {
    Driver.browseUrl(Driver.baseUrl, callback);
  }
};

Navigation.browse = function(Driver, path, callback) {
  Driver.browseUrl(url.resolve(Driver.baseUrl, path), callback);
};

Navigation.refresh = function(Driver, callback) {
  Driver.refresh(callback);
};

Navigation.back = function(Driver, callback) {
  Driver.back(callback);
};
