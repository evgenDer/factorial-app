import { MAX_INPUT, Orientation, ORIENTATION_KEY } from "../constants";
import { FactorialCache } from "./factorialCache";
import { FactorialCalculator } from "./factorialCalculator";

const cache = new FactorialCache();
const calculator = new FactorialCalculator(cache);

/**
 * Returns a spill range of factorial values from 0! to N!
 * @customfunction FACTORIALROW
 * @param {number} n The maximum number to calculate factorial for
 * @returns {Array<Array<string>>} A horizontal array of factorial values from 0! to N!
 */
export async function factorialRow(n: number): Promise<string[][]> {
  if (!Number.isInteger(n) || n < 0) {
    return [["n must be a non-negative integer"]];
  }

  if (n > MAX_INPUT) {
    return [[`n too large (max ${MAX_INPUT})`]];
  }

  const orientation = (await OfficeRuntime.storage.getItem(ORIENTATION_KEY)) || Orientation.Row;

  return calculator.row(n, orientation as Orientation);
}
