const nodeResolve = require("@rollup/plugin-node-resolve");
const path = require("path");

module.exports = {
  input: path.resolve(__dirname, "./index.js"),
  output: [
    {
      dir: path.resolve(__dirname, "./dist"),
      format: "esm",
    },
  ],
  plugins: [nodeResolve()],
  external: [],
};
