var url = require('url');

///////////////////

function parseUrlWithEnv (url) {
  var matches = /^\${([^"]*)}/.exec(url);
  return matches ? process.env[matches[1]] + url.replace(matches[0], '') : url;
}

function baseUrl (Driver, sUrl, callback) {
  var parsed      = url.parse(parseUrlWithEnv(sUrl));
  Driver.baseUrl  = url.format(parsed);
  callback();
}

function wait (Driver, sec, callback) {
  setTimeout(callback, parseInt(sec) * 1000);
}

///////////////////

module.exports = {
  baseUrl:  baseUrl,
  wait:     wait
};
