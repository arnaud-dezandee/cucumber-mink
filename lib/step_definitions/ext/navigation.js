var url = require('url');

///////////////////

function root(Driver, callback) {
  if (! Driver.baseUrl) {
    callback.fail(new Error('Please provide a base url to use root functions !'));
  } else {
    Driver.browseUrl(Driver.baseUrl, callback);
  }
}

function browse(Driver, path, callback) {
  Driver.browseUrl(url.resolve(Driver.baseUrl, path), callback);
}

function reload(Driver, callback) {
  Driver.reload(callback);
}

function back(Driver, callback) {
  Driver.back(callback);
}

///////////////////

module.exports = {
  browse: browse,
  root:   root,
  reload: reload,
  back:   back
};
