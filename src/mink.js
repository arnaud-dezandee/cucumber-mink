/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Arnaud Dezandee
 *
 * Authors:
 *     Arnaud Dezandee <dezandee.arnaud@gmail.com>
 */

import chai from 'chai';
import chaiErr from './utils/chai-err.js';
chai.use(chaiErr);

import pkg from '../package.json';

import defineStep from './methods/defineStep.js';
import findStep from './methods/findStep.js';
import manyStep from './methods/manyStep.js';
import metaStep from './methods/metaStep.js';
import registerHooks from './methods/registerHooks.js';
import runStep from './methods/runStep.js';

class Mink {
  constructor() {
    this.VERSION = pkg.version;
    this.Ext = require('./step_definitions/ext');

    this.initialized = false;
    this.parameters = {};
    this.steps = [];

    this.cucumber = null;
    this.driver = null;
  }
}

Mink.prototype.init = require('./methods/init.js');

Mink.prototype.defineStep = defineStep;
Mink.prototype.Given = defineStep;
Mink.prototype.Then = defineStep;
Mink.prototype.When = defineStep;

Mink.prototype.findStep = findStep;
Mink.prototype.manyStep = manyStep;
Mink.prototype.metaStep = metaStep;
Mink.prototype.registerHooks = registerHooks;
Mink.prototype.runStep = runStep;

export default new Mink();
