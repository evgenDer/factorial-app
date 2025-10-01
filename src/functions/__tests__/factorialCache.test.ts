import { FactorialCache } from "../factorialCache";
import { mockOfficeRuntime } from "./mockOfficeRuntime";

describe("FactorialCache", () => {
  let cache: FactorialCache;

  beforeEach(() => {
    (global as any).OfficeRuntime = mockOfficeRuntime;
    mockOfficeRuntime.storage.getItem.mockResolvedValue(JSON.stringify([]));
    mockOfficeRuntime.storage.setItem.mockResolvedValue(undefined);
    cache = new FactorialCache();
  });

  describe("core functionality", () => {
    it("should save and retrieve data", () => {
      const testData: [number, string][] = [
        [1, "1"],
        [2, "2"],
        [3, "6"],
      ];

      cache.saveAll(testData);
      const retrieved = cache.getAll();

      expect(retrieved).toEqual(testData);
    });

    it("should initialize with 0! = 1", () => {
      const data = cache.getAll();
      expect(data).toContainEqual([0, "1"]);
    });

    it("should replace existing data when saving new data", () => {
      cache.saveAll([[1, "1"]]);
      cache.saveAll([[2, "2"]]);

      const data = cache.getAll();
      expect(data).toEqual([[2, "2"]]);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
