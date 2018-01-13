import {StoreAdapter} from '../src/StoreAdapter';
import {stub, SinonStub} from 'sinon';

export class TestStorageAdapter implements StoreAdapter {
  public saveStub: SinonStub = stub();
  public loadStub: SinonStub = stub();
  save(key: string, data: string): void {
    this.saveStub(key, data);
  }

  load(key: string): string | null {
    return this.loadStub(key);
  }

}
