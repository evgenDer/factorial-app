import { Orientation } from "../constants";
import { FactorialCache } from "./factorialCache";
// @ts-ignore
import FactorialWorker from "worker-loader!./factorialWorker.worker.ts";

export class FactorialCalculator {
  private cache: FactorialCache;

  constructor(cache: FactorialCache) {
    this.cache = cache;
  }

  private prepareWorker(): Worker {
    return new FactorialWorker();
  }

  private handleMessage = (
    event: MessageEvent,
    resolve: Function,
    worker: Worker,
    orientation: Orientation
  ) => {
    const { memo, row } = event.data as { memo: [number, string][]; row: string[] };
    this.cache.saveAll(memo);
    resolve(this.formatResult(row, orientation));
    worker.terminate();
  };

  private handleError = (err: ErrorEvent, reject: Function, worker: Worker) => {
    reject(err);
    worker.terminate();
  };

  private formatResult(row: string[], orientation: Orientation): string[][] {
    return orientation === Orientation.Row ? [row] : row.map((value) => [value]);
  }

  public row(n: number, orientation: Orientation): Promise<string[][]> {
    return new Promise((resolve, reject) => {
      const worker = this.prepareWorker();

      worker.postMessage({ n, memo: this.cache.getAll() });

      worker.onmessage = (event) => this.handleMessage(event, resolve, worker, orientation);
      worker.onerror = (err) => this.handleError(err, reject, worker);
    });
  }
}
