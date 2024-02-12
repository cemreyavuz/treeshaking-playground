# treeshaking-playground

## Part 1 - Unused exports

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

## Part 2 - Side effects

`usedExports` relies on terser to detect side effects in statements. It is a difficult task in JavaScript and not as effective as straightforward `sideEffects` flag. It also can't skip subtree/dependencies since the spec says that side effects need to be evaluated. While exporting function works fine, React's Higher Order Components (HOC) are problematic in this regard.

In this example, we import `VoidVariable` from `util.js` but we don't actually use it. However, unlike `square` function in the previous example, it's not tree shaken this time. The lines with `"foo"` and `"bar"` are coming from `util.js`.

```js
(() => {
  "use strict";
  var e;
  ((e = {}).F = "foo"),
    (e.B = "bar"),
    (document.body.innerHTML = "Hello webpack!");
})();
```

One way to help terser to understand that this code is side-effect free is using `/*#__PURE__*/` annotation. It flags a statement as side effect free. So a small change would make it possible to tree-shake the code.

```js
// util.js
const VoidVariable = /*#__PURE__*/ noSideEffectWrapper({});

// bundle.js
(() => {
  "use strict";
  document.body.innerHTML = "Hello webpack!";
})();
```

It is a working solution, but it's not so easy to add this annotation to everywhere. That's where `sideEffects` property comes in play. Using `sideEffects`, we can set these hints at module level directly.

```json
{
  "name": "your-project",
  "sideEffects": false
}
```

In a 100% ESM module world, identifying side effects is straightforward. However, we're not there quite yet, so in the mean time it's necessary to provide hints to webpack's compiler on the "pureness" of your code. The way this is accomplished is the `sideEffects` `package.json` property.

```json
{
  "name": "your-project",
  "sideEffects": false
}
```

If your code did have some side effects though, an array can be provided instead:

```json
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js"]
}
```

The `sideEffects` and `usedExports` (more known as tree shaking) optimizations are two different things.

`sideEffects` is much more effective since it allows to skip whole modules/files and the complete subtree.