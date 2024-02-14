const initializeLibInstance = () => {
  window.global.myAwesomeLibrary = {
    talk: () => {
      console.log("hello");
    },
    setName: (name) => {
      window.global.myAwesomeLibraryName = name;
    },
    getName: () => {
      return window.global.myAwesomeLibraryName;
    },
  };
};

initializeLibInstance();

const getName = window.global.myAwesomeLibrary.getName;

const square = (x) => {
  return x * x;
};

const cube = (x) => {
  return x * x * x;
};

const noSideEffectWrapper = (arg) => {
  arg.F = "foo";
  arg.B = "bar";
};

const VoidVariable = noSideEffectWrapper({});

export { VoidVariable, cube, getName, square };
