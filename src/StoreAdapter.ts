export interface StoreAdapter {
  save(key: string, data: string): void;
  load(key: string): string | null;
}
