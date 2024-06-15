import { figuresContainer } from "../figures-container";
import { createPropPane, closePropPane } from "./create-prop-pane";

const searchInput: HTMLInputElement = document.querySelector("#search-input")!;

export const initializeSearchInput = () => {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = (e.target as HTMLInputElement).value.trim();
    const figure = figuresContainer.figures.find(
      (f) => f.properties.name.value.trim() === searchTerm
    );
    if (figure) {
      createPropPane(figure);
    } else {
      closePropPane();
    }
  });
};
