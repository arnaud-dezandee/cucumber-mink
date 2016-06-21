/**
* Dependencies
*/

import Promise from 'bluebird';
import { getMockFunction } from 'jest-mock';
import { expect } from 'chai';

import Driver from '../../src/drivers/webdriverio.js';

/**
* Tests
*/

const mockClient = () => {
  const client = {
    init: getMockFunction(),
    elements: getMockFunction(),
  };

  client.elements.mockReturnValue(
    Promise.resolve({ value: [] })
  );

  return client;
};

describe('Driver API', () => {
  const driver = new Driver({});
  const client = driver.client = mockClient();

  it('client symlinks', () => {
    driver.init();
    expect(client.init.mock.calls.length).to.equal(1);
    expect(client.init.mock.calls[0]).to.deep.equal([]);
  });

  it('button method', () => {
    client.elements.mockClear();

    return driver.button('.button-missing').catch(err => {
      expect(client.elements.mock.calls.length).to.equal(3);
      expect(client.elements.mock.calls).to.deep.equal([
        ['.button-missing'],
        ['button'],
        ['input[type=submit]'],
      ]);

      expect(err).to.be.instanceof(Error);
      expect(err.message).to.equal('Button not found !');
    });
  });

  it('link method', () => {
    client.elements.mockClear();

    return driver.link('.link-missing').catch(err => {
      expect(client.elements.mock.calls.length).to.equal(2);
      expect(client.elements.mock.calls).to.deep.equal([
        ['.link-missing'],
        ['body a'],
      ]);

      expect(err).to.be.instanceof(Error);
      expect(err.message).to.equal('Link not found !');
    });
  });
});
