import { factorialRow } from "../functions";
import { MAX_INPUT, Orientation } from "../../constants";
import { mockOfficeRuntime } from "./mockOfficeRuntime";

jest.mock("../factorialCalculator", () => {
  const mockRow = jest.fn().mockResolvedValue([["1", "1", "2", "6"]]);

  return {
    FactorialCalculator: jest.fn().mockImplementation(() => ({
      row: mockRow,
    })),
  };
});

describe("factorialRow function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).OfficeRuntime = mockOfficeRuntime;
    mockOfficeRuntime.storage.getItem.mockResolvedValue(Orientation.Row);
  });

  describe("validation", () => {
    it("should reject non-integer input", async () => {
      const result = await factorialRow(3.5);
      expect(result).toEqual([["n must be a non-negative integer"]]);
    });

    it("should reject negative input", async () => {
      const result = await factorialRow(-1);
      expect(result).toEqual([["n must be a non-negative integer"]]);
    });

    it("should reject input exceeding MAX_INPUT", async () => {
      const result = await factorialRow(MAX_INPUT + 1);
      expect(result).toEqual([[`n too large (max ${MAX_INPUT})`]]);
    });

    it("should accept valid integer input", async () => {
      const result = await factorialRow(2);
      expect(result).toEqual([["1", "1", "2", "6"]]);
    });
  });

  describe("core functionality", () => {
    it("should return factorial calculation result", async () => {
      const result = await factorialRow(3);
      expect(result).toEqual([["1", "1", "2", "6"]]);
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
