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

export const getName = window.global.myAwesomeLibrary.getName;
