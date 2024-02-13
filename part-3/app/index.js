import { cube } from "../lib/dist/bundle-cjs";

document.body.innerHTML = [
  "Hello webpack!",
  "5 cubed is equal to " + cube(5),
].join("\n\n");
