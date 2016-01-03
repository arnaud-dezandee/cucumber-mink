/**
* Dependencies
*/

import { getMockFunction } from 'jest-cli/src/lib/moduleMocker.js';
import { expect } from 'chai';

import Driver from '../../src/driver.js';

/**
* Tests
*/

const mockClient = () => {
  return {
    init: getMockFunction(),
  };
};

describe('Driver API', () => {
  const driver = new Driver({});
  driver.client = mockClient();

  it('client symlinks', () => {
    driver.init();
    expect(driver.client.init.mock.calls.length).to.equal(1);
    expect(driver.client.init.mock.calls[0]).to.deep.equal([]);
  });
});
