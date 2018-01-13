import { StoreAdapter } from './StoreAdapter';

export class LocalStorageAdapter implements StoreAdapter {
  save(key: string, data: string): void {
    localStorage.setItem(key, data);
  }
  load(key: string): string | null {
    return localStorage.getItem(key);
  }
}
