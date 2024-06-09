export const createButton = (
  text: string,
  className: string,
  onClick: () => void
): HTMLButtonElement => {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
};
