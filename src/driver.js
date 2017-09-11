/**
 * Dependencies
 */

const dbg = require('debug');
const ProtractorDriver = require('./drivers/protractor.js');
const WdIODriver = require('./drivers/webdriverio.js');

/**
 * Private
 */

const debug = dbg('mink:driver');

/**
 * Interface
 */

module.exports = function configureDriver(parameters) {
  debug(parameters);

  if (!!parameters.protractor && global.protractor) {
    return new ProtractorDriver(parameters);
  }

  return new WdIODriver(parameters);
};
