import {LocalStorageAdapter} from '../src/LocalStorageAdapter';
import {stub, assert} from 'sinon';
import {expect} from 'chai';

const localStorage = {
  setItem: stub(),
  getItem: stub()
};

describe('LocalStorageAdapter', () => {
  let adapter = new LocalStorageAdapter(localStorage as any);
  beforeEach(() => {
    adapter = new LocalStorageAdapter(localStorage as any);
  });

  it('should call localStorage for save', () => {
    adapter.save('Test_Key', 'SampleData');
    assert.calledWith(localStorage.setItem, 'Test_Key', 'SampleData');
  });

  it('should call localStorage for load', () => {
    localStorage.getItem.returns('SampleObject return');
    const result = adapter.load('Test_Key');
    assert.calledWith(localStorage.getItem, 'Test_Key');
    expect(result).to.be.equals('SampleObject return');
  });
});
