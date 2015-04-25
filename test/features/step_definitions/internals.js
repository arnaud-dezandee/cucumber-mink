var Mink  = require('../../../lib/mink'),
    Ext   = Mink.Ext;

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
    Mink.metaStep(stepArray, function(err) {
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

function loadPartials(Driver, callback) {
  try {
    Mink.loadPartials('/missingDir');
  } catch(error) {
    assert.isNotNull(error);
    assert.equal(error.message, 'Load partials: missing directory /missingDir');
    callback();
  }
}

function retrieveMissingStep(Driver, callback) {
  var step = Mink.findMatchingStep('I invoke a missing step');
  assert.isNull(step);
  callback();
}

function executeErrorPartial(Driver, callback) {
  var step = Mink.findMatchingStep('I execute a partial with a non existing step');
  try {
    step.stepFunc(callback);
  } catch(error) {
    assert.isNotNull(error);
    assert.equal(error.message, 'Missing step definition for I invoke a missing step');
    callback();
  }
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
  this.Given(/^test missing partials directory$/, loadPartials);
  this.Given(/^test retrieve missing step$/,      retrieveMissingStep);
  this.Given(/^I execute an error partial$/,      executeErrorPartial);
}

module.exports = function() {
  steps.call(Mink);
};
