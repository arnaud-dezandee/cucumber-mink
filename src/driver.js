/**
 * Dependencies
 */

import dbg from 'debug';
import ProtractorDriver from './drivers/protractor.js';
import WdIODriver from './drivers/webdriverio.js';

/**
 * Private
 */

const debug = dbg('mink:driver');

/**
 * Interface
 */

export const configureDriver = (parameters) => {
  debug(parameters);

  if (!!parameters.protractor && global.protractor) {
    return new ProtractorDriver(parameters);
  }

  return new WdIODriver(parameters);
};
