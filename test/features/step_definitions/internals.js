var mink  = require('../../../lib/mink'),
    Ext   = mink.Ext;

var fs      = require('fs'),
    async   = require('async'),
    chai    = require('chai'),
    assert  = chai.assert;

////////////////////////////

function fileExist(Driver, filePath, callback) {
  fs.exists(filePath, function(exist) {
    assert(exist, true);
    fs.unlink(filePath, callback);
  });
}

function driverMissingButton(Driver, callback) {
  Driver.button('.button-missing', function (err) {
    assert.isNotNull(err);
    assert.equal(err.message, 'Button not found !');
    callback();
  });
}

function driverMissingLink(Driver, callback) {
  Driver.link('.link-missing', function (err) {
    assert.isNotNull(err);
    assert.equal(err.message, 'Link not found !');
    callback();
  });
}

function minkMissingButton(Driver, callback) {
  Ext.Action.press(Driver, '.button-missing', function (err) {
    assert.isNotNull(err);
    assert.equal(
      err.message,
      'Unable to find button / input[type=submit] with selector or text matching .button-missing'
    );
    callback();
  });
}

function minkMissingLink(Driver, callback) {
  Ext.Action.follow(Driver, '.link-missing', function (err) {
    assert.isNotNull(err);
    assert.equal(err.message, 'Unable to find a link with selector or text matching .link-missing');
    callback();
  });
}

function unsetBaseUrl(Driver, callback) {
  Driver.baseUrl = false;
  callback();
}

function testBrowseHomepage(Driver, callback) {
  Ext.Navigation.root(Driver, function (err) {
    assert.isNotNull(err);
    assert.equal(err.message, 'Please provide a base url to use root functions !');
    callback();
  });
}

function failingMetaBuilder(Driver, callback) {
  var stepArray1 = [{
    stepFunc: function(Dr, cb) { cb.fail(new Error('MB Failing !')); },
    args: []
  }];
  var stepArray2 = [{
    stepFunc: function(Dr, cb) { cb.fail('MB Failing !'); },
    args: []
  }];
  var stepArray3 = [{
    stepFunc: function(Dr, cb) { cb(new Error('MB Failing !')); },
    args: []
  }];

  async.every([stepArray1, stepArray2, stepArray3], function(stepArray, cb) {
    mink.metaStep(Driver, stepArray, function(err) {
      assert.isNotNull(err);
      assert.equal(err.message, 'MB Failing !');
      cb();
    });
  }, callback);
}

function clickWrongArgs(Driver, callback) {
  Driver.click({}, function(err) {
    assert.isNotNull(err);
    assert.equal(err.message, 'Type mismatch, selector should be string or WebElement obj');
    callback();
  });
}

////////////////////////////

function steps() {
  this.Then(/^a file should exist at "([^"]*)"$/, fileExist);
  this.Then(/^test driver non-existing button$/,  driverMissingButton);
  this.Then(/^test mink non-existing button$/,    minkMissingButton);
  this.Then(/^test driver non-existing link$/,    driverMissingLink);
  this.Then(/^test mink non-existing link$/,      minkMissingLink);
  this.Given(/^there is no base url$/,            unsetBaseUrl);
  this.Given(/^test browse homepage$/,            testBrowseHomepage);
  this.Given(/^a failing meta-builder steps$/,    failingMetaBuilder);
  this.Given(/^test click wrong arguments$/,      clickWrongArgs);
}

module.exports = function() {
  steps.call(mink);
};
