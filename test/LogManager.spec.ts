import {LogManager} from '../src/LogManager';
import {LogLevel} from "../src/LogLevel";

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
      assert.callCount(storage.saveStub, 0);
    });

    it('disable should throw with unknown flag', () => {
      expect(() => {
        lgm.disable('SomeTestLogger');
      }).to.throw();
      assert.callCount(storage.saveStub, 0);
    });

    it('hide all still works', () => {
      lgm.hideAll();

      assert.calledWith(storage.saveStub, 'TEST_LGM', '{}');
    });

    it('setAllLogLevel still works', () => {
      lgm.setAllLogLevel(LogLevel.INFO);

      assert.calledWith(storage.saveStub, 'TEST_LGM', '{}');
    });
  });

  describe('Logger interaction', () => {
    const lgm = new LogManager('TEST_LGM', storage);
    const logger = lgm.getInstance('TestLog');

    before(() => {
      storage.loadStub.reset();
      storage.saveStub.reset();
    });

    it('should create logger with correct label and level', () => {
      const temp = lgm.getInstance('MyLog');

      expect(temp.logLevel).to.be.equals(LogLevel.WARN);
      expect(temp.label).to.be.equals('MyLog');
    });


    it('should return similar instance for previous created logger', () => {
      const temp = lgm.getInstance('TestLog');

      expect(temp).to.equals(logger);
    });

    it('setLevel sets level of specific logger and saves state', () => {
      lgm.setLogLevel('TestLog', LogLevel.LOG);

      expect(logger.logLevel).to.equals(LogLevel.LOG);
      assert.calledWith(storage.saveStub, 'TEST_LGM', '{"TestLog":4,"MyLog":2}');
    });
  });

  describe('State restoring', () => {
    before(() => {
      storage.loadStub.reset();
      storage.saveStub.reset();
    });
    it('should restore loggers state', () => {
      storage.loadStub.returns(JSON.stringify({'TestLog': LogLevel.INFO}));

      const lgm = new LogManager('TestLgm', storage);

      expect(lgm.loggers).to.have.keys(['TestLog']);
      expect(lgm.loggers['TestLog'].logLevel).to.be.equals(LogLevel.INFO);
    })
  });
});
