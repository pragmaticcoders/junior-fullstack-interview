import { isNil, splitEvery } from "ramda";

export function isNotNil<T>(data: T | undefined | null): data is T {
  return !isNil(data);
}

export const mapNil = <V, R>(
  func: (value: V) => R,
  value: V | undefined | null
): R | undefined | null => (isNil(value) ? value : func(value));

export function isObject(data: unknown): data is object {
  return Object.prototype.toString.call(data) === "[object Object]";
}

export function isArray(data: unknown): data is unknown[] {
  return data instanceof Array;
}

export function omit<T extends { [k: string]: any }>(key: string, obj: T) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

export function sleep(milliseconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

export function getPercentage(numerator: number, denominator: number) {
  if (denominator === 0) {
    return "0";
  }
  return ((numerator / denominator) * 100).toFixed(0);
}

export function stripWhitespace(str: string) {
  if (!str) {
    return "";
  }
  return str.replace(/\s|\n|\r/g, "");
}

export type Dict<T> = { [k: string]: T };
export type DictNumber<T> = { [k: number]: T };
export type EnumDict<K extends string | number, T> = { [key in K]: T };

export type Pick2<T, K1 extends keyof T, K2 extends keyof T[K1]> = {
  [P1 in K1]: {
    [P2 in K2]: T[K1][P2];
  };
};

export type Await<TParam> = TParam extends {
  then(onfulfilled?: (value: infer TResult) => unknown): unknown;
}
  ? TResult
  : TParam;

type Builder<T> = () => T;

export function optionalProp<T extends object>(condition: boolean, obj: T | Builder<T>): T | {} {
  return condition ? (typeof obj === "function" ? (obj as Builder<T>)() : obj) : {};
}

export function optionalArrayItem(condition: boolean, item: any) {
  return condition ? [item] : [];
}

export function promiseSequence<T>(promises: Array<() => Promise<T>>, delay = 0) {
  return promises.reduce(
    async (curr, next) => [...(await curr), await sleep(delay).then(next)],
    Promise.resolve([] as T[])
  );
}

export function promiseSequenceBatches<Result>(
  batchSize: number,
  calls: Array<() => Promise<Result>>
): Promise<Result[]> {
  const batches = splitEvery(batchSize, calls).map(batch => () => Promise.all(batch.map(i => i())));

  return promiseSequence(batches).then(items => items.flat());
}

export function promiseSequenceBatchesWithInterval<Result>(
  batchSize: number,
  interval: number,
  calls: Array<() => Promise<Result>>
): Promise<Result[]> {
  const batches = splitEvery(batchSize, calls).map(batch => async () => {
    const startDate = new Date().getTime();
    const batchResults = await Promise.all(batch.map(i => i()));
    const now = new Date().getTime();
    const elapsed = now - startDate;
    if (elapsed < interval) {
      await sleep(interval - elapsed);
    }
    return batchResults;
  });

  return promiseSequence(batches).then(items => items.flat());
}

export function promiseAllBatchesWithInterval<Result>(
  batchSize: number,
  interval: number,
  calls: Array<() => Promise<Result>>
): Promise<Result[]> {
  const batches = splitEvery(batchSize, calls).map(async (batch, index) => {
    await sleep(index * interval + 50);
    return Promise.all(batch.map(i => i()));
  });

  return Promise.all(batches).then(items => items.flat());
}

export function obfuscate(str: string, maxSeqLen = 2): string {
  const prefix = str.substr(0, Math.min(maxSeqLen, str.length));

  let suffix = "";
  if (str.length >= 3 * maxSeqLen) {
    suffix = str.substr(str.length - maxSeqLen, maxSeqLen);
  }

  return prefix + "***" + suffix;
}
