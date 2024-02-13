(() => {
  "use strict";
  var e,
    r = {
      288: (e) => {
        e.exports = { square: (e) => e * e, cube: (e) => e * e * e };
      },
    },
    o = {};
  function t(e) {
    var n = o[e];
    if (void 0 !== n) return n.exports;
    var u = (o[e] = { exports: {} });
    return r[e](u, u.exports, t), u.exports;
  }
  (t.n = (e) => {
    var r = e && e.__esModule ? () => e.default : () => e;
    return t.d(r, { a: r }), r;
  }),
    (t.d = (e, r) => {
      for (var o in r)
        t.o(r, o) &&
          !t.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: r[o] });
    }),
    (t.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
    (e = t(288)),
    (document.body.innerHTML = [
      "Hello webpack!",
      "5 cubed is equal to " + (0, e.cube)(5),
    ].join("\n\n"));
})();
