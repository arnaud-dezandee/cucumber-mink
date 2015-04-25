/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

var fs = require('fs');
var path = require('path');

var debug = require('debug')('mink:loadPartials');
var Gherkin = require('gherkin');
var _ = require('lodash');

function createAst(content) {
  var Parser  = new Gherkin.Parser();
  var Builder = new Gherkin.AstBuilder();
  var TokenMatcher = new Gherkin.TokenMatcher();
  var scanner = new Gherkin.TokenScanner(content);
  return Parser.parse(scanner, Builder, TokenMatcher);
}

function generateStepFunc(Mink, Scenario) {
  return function(Driver, callback) {
    debug('Executing partial step', Scenario.name);
    var stepArray = _.map(Scenario.steps, function(Step) {
      var search =  Mink.findMatchingStep(Step.text);
      if (!search) {
        throw new Error('Missing step definition for ' + Step.text);
      }
      return search;
    });
    Mink.metaStep(stepArray, callback);
  };
}

function processAst(Mink) {
  return function(Ast) {
    Ast.scenarioDefinitions.forEach(function(Scenario) {
      Mink.defineStep(
        new RegExp('^' + Scenario.name + '$'),
        generateStepFunc(Mink, Scenario)
      );
    });
  };
}

/**
 * @param {String} directory    Partials files directory
 */
module.exports = function loadPartials(directory) {
  /* eslint no-sync:0 */
  var absolute = path.normalize(directory);

  if (!fs.existsSync(absolute)) {
    throw new Error('Load partials: missing directory ' + absolute);
  }

  fs.readdirSync(absolute)
    .map(function(file) {
      return path.join(absolute, file);
    })
    .map(function(absolutePath) {
      return fs.readFileSync(absolutePath, {encoding: 'UTF8'});
    })
    .map(createAst)
    .map(processAst(this));
};
