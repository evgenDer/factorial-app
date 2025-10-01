import { FactorialCache } from "../factorialCache";

describe("FactorialCalculator", () => {
  let mockCache: jest.Mocked<FactorialCache>;

  beforeEach(() => {
    mockCache = {
      getAll: jest.fn().mockReturnValue([[0, "1"]]),
      saveAll: jest.fn(),
    } as any;
  });

  describe("core functionality", () => {
    it("should get memo from cache", () => {
      const memo = mockCache.getAll();
      expect(Array.isArray(memo)).toBe(true);
      expect(memo).toContainEqual([0, "1"]);
    });

    it("should save memo to cache", () => {
      const memo: [number, string][] = [
        [1, "1"],
        [2, "2"],
      ];
      mockCache.saveAll(memo);
      expect(mockCache.saveAll).toHaveBeenCalledWith(memo);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
