import { StoreAdapter } from './StoreAdapter';

export class LocalStorageAdapter implements StoreAdapter {
  save(key: string, data: any): void {
    localStorage.setItem(key, data);
  }
  load(key: string): any {
    localStorage.getItem(key);
  }
}
