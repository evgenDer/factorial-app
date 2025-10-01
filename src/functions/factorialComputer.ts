export class FactorialComputer {
  private memo: Map<number, string>;

  constructor(initialMemo?: [number, string][]) {
    this.memo = new Map(initialMemo || [[0, "1"]]);
  }

  public computeUpTo(n: number): string[] {
    for (let i = 1; i <= n; i++) {
      if (!this.memo.has(i)) {
        const prev = BigInt(this.memo.get(i - 1)!);
        this.memo.set(i, (prev * BigInt(i)).toString());
      }
    }

    const row: string[] = [];
    for (let i = 0; i <= n; i++) {
      row.push(this.memo.get(i)!);
    }
    return row;
  }

  public getMemo(): [number, string][] {
    return Array.from(this.memo.entries());
  }
}
