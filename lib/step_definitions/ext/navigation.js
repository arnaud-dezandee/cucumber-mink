var url = require('url');

///////////////////

function root(callback) {
  if (! this.baseUrl) {
    callback.fail(new Error('Please provide a base url to use root functions !'));
  } else {
    this.driver.browseUrl(this.baseUrl, callback);
  }
}

function browse(path, callback) {
  this.driver.browseUrl(url.resolve(this.baseUrl, path), callback);
}

function reload(callback) {
  this.driver.reload(callback);
}

function back(callback) {
  this.driver.back(callback);
}

///////////////////

module.exports = {
  browse: browse,
  root:   root,
  reload: reload,
  back:   back
};
