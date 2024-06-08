// Files in this folder will not be directly compiled, but will be bundled automatically when referenced.
// You can reference them using the `@shared` import namespace.

/*** Replacement for `eval()` to avoid direct eval issues. **/
export function evaluate(expression: string) {
    return (0, eval)(expression);
}
