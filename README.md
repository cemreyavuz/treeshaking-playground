# treeshaking-playground

## Part 1 - Unused exports

- `mode` is set to `"development"` to make sure that the bundle is not minified
- `usedExports` is set to `true` to determine used exports for each module.
  - Information collected here is used by other optimizations.
  - Dead code elimination in minimizers will benefit from this and can remove unused exports.

We didn't import the `square` method from `math.js`. That function is what's known as "dead code", meaning an unused `export` that should be dropped.

```js
// bundle.js
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
// bundle.js
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

It is a working solution, but it's not so easy to add this annotation to everywhere. That's where `sideEffects` `package.json` property comes in play. Using `sideEffects`, we can set these hints at module level directly.

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

## Part 3 - ESM vs CJS

ESM (ESModules) and CJS (CommonJS) are two different ways of writing modules. CJS can be recognized by the use of `require()` and `module.exports` while ESM uses `import` and `export` statements for similar (though not identical) functionality. The main difference between two is that while CJS `require` is dynamic, ESM `import` is static. That has several benefits but the one we care about is that it is easier to analyze ESM `import` during compile-time. In many cases, while ESM bundles can be tree-shaken, CJS bundles are not.

For example, this example cannot be tree-shaken if you have CJS bundle for your library (notice the reference to `square` function in `bundle.js`):

```js
// index.js (library)
const square = (x) => {
  return x * x;
};

const cube = (x) => {
  return x * x * x;
};

export default {
  square,
  cube,
};

// index.js (app)

import { cube } from "../lib/dist/bundle-cjs";

document.body.innerHTML = [
  "Hello webpack!",
  "5 cubed is equal to " + cube(5),
].join("\n\n");

// bundle.js
(() => {
  "use strict";
  var e,
    r,
    o = {
      288: (e) => {
        e.exports = { square: (e) => e * e, cube: (e) => e * e * e };
      },
    },
    t = {};
...
```

## Part 4 - Preserving module structure

`preserveModules` is a configuration option provided by rollup. When we set this to `true`, instead of having our whole bundle in one file, we keep having modules in separate files - which helps tree-shaking in the end. It's also important for using `sideEffects` `package.json` property. With one file, you can only set `sideEffects` property for your whole bundle.