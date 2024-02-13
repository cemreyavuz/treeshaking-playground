const path = require("path");

module.exports = {
  input: path.resolve(__dirname, "./index.js"),
  output: [
    {
      file: path.resolve(__dirname, "dist/bundle-cjs.js"),
      format: "cjs",
    },
    {
      file: path.resolve(__dirname, "dist/bundle-esm.js"),
      format: "esm",
    },
  ],
};
