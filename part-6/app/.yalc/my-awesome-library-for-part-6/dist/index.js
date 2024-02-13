const AddIcon = () => {
  return `<svg aria-label="AddIcon" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"></path></svg>`;
};

const RemoveIcon = () => {
  return `<svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14z"></path></svg>`;
};

var Icons = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AddIcon: AddIcon,
  RemoveIcon: RemoveIcon
});

const Button = ({ icon }) => {
  return `<button>${Icons[icon]}</button>`;
};

export { AddIcon, Button, RemoveIcon };
