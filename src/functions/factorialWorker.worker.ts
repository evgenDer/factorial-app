import { FactorialComputer } from "./factorialComputer";

interface ComputeMessage {
  n: number;
  memo?: [number, string][];
}

self.addEventListener("message", (event: MessageEvent<ComputeMessage>) => {
  const { n, memo } = event.data;
  const computer = new FactorialComputer(memo);

  const row = computer.computeUpTo(n);
  self.postMessage({ memo: computer.getMemo(), row });
});
