import {LogManager} from '../src/LogManager';

import {assert} from 'sinon';
import {expect} from 'chai';

import {TestStorageAdapter} from './TestStorageAdapter';

describe('LogManager', function () {
  let storage: TestStorageAdapter = new TestStorageAdapter();

  describe('Empty store initialisation', () => {
    let lgm = new LogManager('TEST_LGM', storage);

    before(() => {
      storage.loadStub.reset();
      storage.saveStub.reset();
      lgm = new LogManager('TEST_LGM', storage);
    });

    it('should load by store key', () => {
      assert.calledWith(storage.loadStub, 'TEST_LGM');
    });

    it('should handle null properly', () => {
      expect(Object.keys(lgm.loggers)).to.have.lengthOf(0);
    });
    it('enable should throw with unknown flag', () => {
      expect(() => {
        lgm.enable('SomeTestLogger');
      }).to.throw();
    });
  });

});
