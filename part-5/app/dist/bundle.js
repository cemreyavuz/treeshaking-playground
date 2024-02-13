(() => {
  "use strict";
  var t = {};
  t.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })();
  var r = "object" == typeof t.g && t.g && t.g.Object === Object && t.g,
    e = "object" == typeof self && self && self.Object === Object && self,
    n = (r || e || Function("return this")()).Symbol,
    o = Object.prototype,
    i = o.hasOwnProperty,
    c = o.toString,
    u = n ? n.toStringTag : void 0,
    l = Object.prototype.toString,
    f = "[object Null]",
    a = "[object Undefined]",
    b = n ? n.toStringTag : void 0;
  var y,
    p = "[object Symbol]",
    g = Array.isArray,
    s = 1 / 0,
    v = n ? n.prototype : void 0,
    d = v ? v.toString : void 0;
  function j(t) {
    if ("string" == typeof t) return t;
    if (g(t))
      return (
        (function (t, r) {
          for (
            var e = -1, n = null == t ? 0 : t.length, o = Array(n);
            ++e < n;

          )
            o[e] = r(t[e], e, t);
          return o;
        })(t, j) + ""
      );
    if (
      (function (t) {
        return (
          "symbol" == typeof t ||
          ((function (t) {
            return null != t && "object" == typeof t;
          })(t) &&
            (function (t) {
              return null == t
                ? void 0 === t
                  ? a
                  : f
                : b && b in Object(t)
                ? (function (t) {
                    var r = i.call(t, u),
                      e = t[u];
                    try {
                      t[u] = void 0;
                      var n = !0;
                    } catch (t) {}
                    var o = c.call(t);
                    return n && (r ? (t[u] = e) : delete t[u]), o;
                  })(t)
                : (function (t) {
                    return l.call(t);
                  })(t);
            })(t) == p)
        );
      })(t)
    )
      return d ? d.call(t) : "";
    var r = t + "";
    return "0" == r && 1 / t == -s ? "-0" : r;
  }
  document.body.innerHTML = `Hello ${void ((y = "webpack"),
  void (function (t) {
    return null == t ? "" : j(t);
  })(y).toUpperCase())}!`;
})();
