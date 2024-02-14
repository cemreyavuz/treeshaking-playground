(() => {
  "use strict";
  window.global.myAwesomeLibrary = {
    talk: () => {
      console.log("hello");
    },
    setName: (e) => {
      window.global.myAwesomeLibraryName = e;
    },
    getName: () => window.global.myAwesomeLibraryName,
  };
  const e = window.global.myAwesomeLibrary.getName;
  var o;
  ((o = {}).F = "foo"),
    (o.B = "bar"),
    (document.body.innerHTML = [
      "Hello webpack!",
      "5 cubed is equal to " + (5, 125),
      "and name is " + e(),
    ].join("\n\n"));
})();
