var Mink  = require('../../../lib/mink');

var fs    = require('fs'),
    path  = require('path');

function loadFile(file, callback) {
  fs.readFile(path.join(__dirname, file), {encoding: 'utf8'}, function(err, content) {
    if (err) { return callback(err); }
    var regex = new RegExp('^I execute ' + file + ' scenario$');
    Mink.defineStep(regex, function(cb) {
      Mink.manyStep(content, cb);
    });
    callback();
  });
}

////////////////////////////

module.exports = function() {
  this.Given(/^I load "([^"]*)" file$/, loadFile);
};
