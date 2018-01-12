export interface StoreAdapter {
  save(key: string, data: any): void;
  load(key: string): any;
}
