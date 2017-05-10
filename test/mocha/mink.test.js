/**
* Dependencies
*/

import jest from 'jest-mock';
import { expect } from 'chai';
import pkg from '../../package.json';

import Mink from '../../src/mink.js';
import Step from '../../src/step.js';

/**
* Tests
*/

const mockCucumber = () => ({
  defineStep: jest.fn(),
  registerHandler: jest.fn(),
  setDefaultTimeout: jest.fn(),
  After: jest.fn(),
});

describe('Mink API', () => {
  describe('before init', () => {
    it('constructor, statics, aliases', () => {
      expect(Mink.steps.isEmpty()).to.equal(true);

      expect(Mink.parameters).to.equal(null);
      expect(Mink.cucumber).to.equal(null);
      expect(Mink.driver).to.equal(null);

      expect(Mink.Given).to.equal(Mink.defineStep);
      expect(Mink.Then).to.equal(Mink.defineStep);
      expect(Mink.When).to.equal(Mink.defineStep);

      expect(Mink.VERSION).to.equal(pkg.version);
    });

    it('init default params', () => {
      const cucumber = mockCucumber();
      Mink.init(cucumber);
      expect(Mink.parameters).to.deep.equal(Mink.DEFAULT_PARAMS);
      expect(Mink.cucumber).to.equal(cucumber);

      expect(cucumber.registerHandler.mock.calls.length).to.equal(2);
      expect(cucumber.registerHandler.mock.calls[0][0]).to.equal('BeforeFeatures');
      expect(cucumber.registerHandler.mock.calls[1][0]).to.equal('AfterFeatures');
      expect(cucumber.setDefaultTimeout.mock.calls[0][0]).to.equal(5000);
    });

    it('init with driver.screenshotPath and screenshotMethod', () => {
      const params = {
        driver: {
          screenshotPath: '/foo/bar',
        },
        screenshotMethod: 'saveDocumentScreenshot',
      };
      const cucumber = mockCucumber();
      Mink.init(cucumber, params);
      Mink.driver.saveDocumentScreenshot = jest.fn();
      const mockEvent = {
        isFailed: () => true,
        getName: () => 'mock-test',
        getLine: () => '69',
      };
      expect(cucumber.After.mock.calls).to.have.lengthOf(1);
      cucumber.After.mock.calls[0][0](mockEvent);
      expect(Mink.driver.saveDocumentScreenshot.mock.calls).have.lengthOf(1);
      expect(Mink.driver.saveDocumentScreenshot.mock.calls[0][0]).to.equal('/foo/bar/mock-test:69.png');
    });
  });

  describe('after init', () => {
    before(() => {
      Mink.cucumber = mockCucumber();
    });

    it('defineStep twice', () => {
      const pattern = 'defineStep';
      const fn = function () {};

      const step1 = Mink.defineStep(pattern, fn);
      const step2 = Mink.defineStep(pattern, fn);

      expect(step1).to.equal(step2);

      const defineStep = Mink.cucumber.defineStep;
      expect(defineStep.mock.calls.length).to.equal(1);
      expect(defineStep.mock.calls[0][0]).to.equal(pattern);
    });

    it('findStep normal', () => {
      const pattern = 'findStep';
      const fn = function () {};

      Mink.defineStep(pattern, fn);
      const step = Mink.findStep('findStep');

      expect(step).to.be.instanceof(Step);
      expect(step.pattern).to.equal(pattern);
      expect(step.fn).to.equal(fn);
    });

    it('findStep missing should throw', () => {
      expect(() => {
        Mink.findStep('missing');
      }).to.throw(Error);
    });

    it('runStep normal', () => {
      const fn = jest.fn();
      Mink.defineStep('runStep', fn);

      return Mink.runStep('runStep').then(() => {
        expect(fn.mock.calls.length).to.equal(1);
        expect(fn.mock.calls[0]).to.deep.equal([]);
      });
    });

    it('runStep with args', () => {
      const fn = jest.fn();
      Mink.defineStep(/^run (\d+)\s(\d+)$/, fn);

      return Mink.runStep('run 13 37').then(() => {
        expect(fn.mock.calls.length).to.equal(1);
        expect(fn.mock.calls[0]).to.deep.equal(['13', '37']);
      });
    });

    it('manyStep normal', () => {
      const fn1 = jest.fn();
      const fn2 = jest.fn();
      Mink.defineStep('manyStep1', fn1);
      Mink.defineStep('manyStep2', fn2);

      return Mink.manyStep(['manyStep1', 'manyStep2']).then(() => {
        expect(fn1.mock.calls.length).to.equal(1);
        expect(fn1.mock.calls[0]).to.deep.equal([]);
        expect(fn2.mock.calls.length).to.equal(1);
        expect(fn2.mock.calls[0]).to.deep.equal([]);
      });
    });

    it('manyStep missing should fail', () =>
      Mink.manyStep(['missing']).catch((error) => {
        expect(error).to.be.instanceof(Error);
        expect(error.message).to.equal('Could not findStep with line "missing"');
      }),
    );

    it('metaStep normal', () => {
      const fn = jest.fn();
      const args = ['h', 'e', 'l', 'l', 'o'];
      const myStep = new Step('myStep', fn, args);

      return Mink.metaStep([myStep, myStep]).then(() => {
        expect(fn.mock.calls.length).to.equal(2);
        expect(fn.mock.calls[0]).to.deep.equal(args);
        expect(fn.mock.calls[1]).to.deep.equal(args);
      });
    });
  });
});
