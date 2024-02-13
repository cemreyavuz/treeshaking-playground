import * as Icons from "./icons";

export const Button = ({ icon }) => {
  return `<button>${Icons[icon]}</button>`;
};
