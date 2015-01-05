///////////////////

function parseUrlWithEnv (url) {
  var matches = /^\${([^"]*)}/.exec(url);
  return matches ? process.env[matches[1]] + url.replace(matches[0], '') : url;
}

function baseUrl (url, callback) {
  this.baseUrl = parseUrlWithEnv(url);
  callback();
}

function wait (sec, callback) {
  setTimeout(callback, parseInt(sec) * 1000);
}

///////////////////

module.exports = {
  baseUrl:  baseUrl,
  wait:     wait
};
