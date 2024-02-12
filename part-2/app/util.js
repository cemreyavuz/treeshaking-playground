const noSideEffectWrapper = (arg) => {
  arg.F = "foo";
  arg.B = "bar";
};

const VoidVariable = /*#__PURE__*/ noSideEffectWrapper({});

export { VoidVariable };
