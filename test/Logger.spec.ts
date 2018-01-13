import { Logger } from '../src/Logger';
import { LogLevel } from '../src/LogLevel';

import { stub, assert } from 'sinon';

declare type ExpectationArray = [{method: keyof Logger, currentLevel: LogLevel}];

const calledExpectations: ExpectationArray = [
  {
    method: 'error',
    currentLevel: LogLevel.ERROR
  },
  {
    method: 'warn',
    currentLevel: LogLevel.WARN
  },
  {
    method: 'info',
    currentLevel: LogLevel.INFO
  },
  {
    method: 'log',
    currentLevel: LogLevel.LOG
  }
];

const notCalledExpectations: ExpectationArray = [
  {
    method: 'error',
    currentLevel: LogLevel.NONE
  },
  {
    method: 'warn',
    currentLevel: LogLevel.ERROR
  },
  {
    method: 'info',
    currentLevel: LogLevel.WARN
  },
  {
    method: 'log',
    currentLevel: LogLevel.INFO
  }
];

const noop = () => {};

const getConsole: any = () => ({
  error: noop,
  warn: noop,
  info: noop,
  log: noop,
});

describe('Logger', () => {
  calledExpectations.forEach((expectation) => {
    it(`Logger with ${LogLevel[expectation.currentLevel]} should do ${expectation.method}`, () => {
      const console = getConsole();
      const methodStub = stub(console, expectation.method);
      const logger = new Logger('SomeFlag', expectation.currentLevel, console);
      (logger[expectation.method] as any)('fefwef');
      assert.calledWith(methodStub, 'SomeFlag', 'fefwef');
    });
  });
  notCalledExpectations.forEach((expectation) => {
    it(`Logger with ${LogLevel[expectation.currentLevel]} shouldn't do ${expectation.method}`, () => {
      const console = getConsole();
      const methodStub = stub(console, expectation.method);
      const logger = new Logger('SomeFlag', expectation.currentLevel, console);
      (logger[expectation.method] as any)('fefwef');
      assert.callCount(methodStub, 0);
    });
  });
});
