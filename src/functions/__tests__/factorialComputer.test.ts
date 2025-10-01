import { FactorialComputer } from "../factorialComputer";

describe("FactorialComputer", () => {
  let computer: FactorialComputer;

  beforeEach(() => {
    computer = new FactorialComputer();
  });

  describe("core functionality", () => {
    it("should compute factorial values correctly", () => {
      const result = computer.computeUpTo(5);

      expect(result).toEqual(["1", "1", "2", "6", "24", "120"]);
    });

    it("should use memoization to avoid recomputation", () => {
      computer.computeUpTo(5);
      const memo = computer.getMemo();

      expect(memo).toContainEqual([0, "1"]);
      expect(memo).toContainEqual([1, "1"]);
      expect(memo).toContainEqual([2, "2"]);
      expect(memo).toContainEqual([3, "6"]);
      expect(memo).toContainEqual([4, "24"]);
      expect(memo).toContainEqual([5, "120"]);
    });

    it("should handle large numbers with BigInt", () => {
      const result = computer.computeUpTo(20);

      expect(result[20]).toBe("2432902008176640000");
    });

    it("should extend existing memo when computing higher values", () => {
      const initialMemo: [number, string][] = [
        [0, "1"],
        [1, "1"],
        [2, "2"],
      ];

      computer = new FactorialComputer(initialMemo);
      const result = computer.computeUpTo(5);

      expect(result).toEqual(["1", "1", "2", "6", "24", "120"]);
    });
  });

  describe("constructor", () => {
    it("should initialize with default memo", () => {
      const memo = computer.getMemo();
      expect(memo).toEqual([[0, "1"]]);
    });

    it("should initialize with provided memo", () => {
      const initialMemo: [number, string][] = [
        [0, "1"],
        [1, "1"],
      ];
      computer = new FactorialComputer(initialMemo);

      const memo = computer.getMemo();
      expect(memo).toEqual(initialMemo);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
