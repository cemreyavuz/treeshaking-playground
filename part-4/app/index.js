import { cube, getName, VoidVariable } from "my-awesome-library-for-part-4";

document.body.innerHTML = [
  "Hello webpack!",
  "5 cubed is equal to " + cube(5),
  "and name is " + getName(),
].join("\n\n");
