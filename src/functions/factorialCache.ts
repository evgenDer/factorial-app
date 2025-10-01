import { STORAGE_KEY } from "../constants";

export class FactorialCache {
  private cacheKey = STORAGE_KEY;
  private cache: Map<number, string> = new Map();

  constructor() {
    this.load();
  }

  private load(): void {
    if (this.isStorageAvailable()) {
      OfficeRuntime.storage.getItem(this.cacheKey).then((result) => {
        const saved: [number, string][] = JSON.parse(result) || [];
        this.cache = new Map(saved);
      });
    } else {
      this.cache = new Map();
    }
    if (!this.cache.has(0)) this.cache.set(0, "1");
  }

  private isStorageAvailable(): boolean {
    return !(typeof OfficeRuntime === "undefined" || OfficeRuntime.storage);
  }

  private save(): void {
    if (this.isStorageAvailable()) {
      setTimeout(() => {
        OfficeRuntime.storage.setItem(
          this.cacheKey,
          JSON.stringify(Array.from(this.cache.entries()))
        );
      }, 1000);
    }
  }

  public saveAll(memo: [number, string][]): void {
    this.cache = new Map(memo);
    this.save();
  }

  public getAll(): [number, string][] {
    return Array.from(this.cache.entries());
  }
}
