import { StoreAdapter } from './StoreAdapter';

export class LocalStorageAdapter implements StoreAdapter {
  constructor(
    private lcs = localStorage
  ) {}
  save(key: string, data: string): void {
    this.lcs.setItem(key, data);
  }
  load(key: string): string | null {
    return this.lcs.getItem(key);
  }
}
