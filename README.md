# treeshaking-playground

## Part 1 - Adding a utility

- `mode` is set to `"development"` to make sure that the bundle is not minified
- `usedExports` is set to `true` to determine used exports for each module.
  - Information collected here is used by other optimizations.
  - Dead code elimination in minimizers will benefit from this and can remove unused exports.

We didn't import the `square` method from `math.js`. That function is what's known as "dead code", meaning an unused `export` that should be dropped.

```js
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cube: () => (/* binding */ cube)
/* harmony export */ });
/* unused harmony export square */
const square = (x) => {
  return x * x;
};

const cube = (x) => {
  return x * x * x;
};
```
