(() => {
  "use strict";
  var o = Object.freeze({
    __proto__: null,
    AddIcon: () =>
      '<svg aria-label="AddIcon" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path></svg>',
    RemoveIcon: () =>
      '<svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14z"></path></svg>',
  });
  document.body.innerHTML = `${(({ icon: t }) => `<button>${o[t]}</button>`)({
    icon: "AddIcon",
  })}`;
})();
