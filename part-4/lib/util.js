const noSideEffectWrapper = (arg) => {
  arg.F = "foo";
  arg.B = "bar";
};

const VoidVariable = noSideEffectWrapper({});

export { VoidVariable };
