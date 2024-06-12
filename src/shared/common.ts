// Files in this folder will not be directly compiled, but will be bundled automatically when referenced.
// You can reference them using the `@shared` import namespace.

import { NS } from "@NS/NetscriptDefinitions";

type SkipFirstParameter<T extends (...rest: any) => any> = T extends (arg1: any, ...args: infer P) => any ? P : never;

/** 
 * Used to bind reusable functions to `NS` in a type-safe way.  Assumes that the first argument is `NS`.
 * For example:
 *   let myFunc = bindNS(ns, nsMyFunc);
 */
export function bindNS<TFunction extends (...rest: any) => any>(ns: NS, fn: TFunction): (...args: SkipFirstParameter<TFunction>) => ReturnType<TFunction> {
  return (...args) => fn(ns, ...args);
}

/**
 * Replacement for `eval()` to avoid direct eval issues.
 */
export function evaluate(expression: string) {
    return (0, eval)(expression);
}
