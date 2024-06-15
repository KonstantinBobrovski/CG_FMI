import { figuresContainer } from "../figures-container";
import { createPropPane, closePropPane } from "./create-prop-pane";

const searchInput: HTMLInputElement = document.querySelector("#search-input")!;

export const initializeSearchInput = () => {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = (e.target as HTMLInputElement).value.trim();
    let figure = figuresContainer.figures.find(
      (f) => f.properties.name.value.trim() === searchTerm
    );
    
    if (!figure) {
      figuresContainer.groups.some((group) => {
        figure = group.figures.find(
          (f) => f.properties.name.value.trim() === searchTerm
        );
        return figure; 
      });
    }
    
    if (!figure) {
      figure = figuresContainer.groups.find(
        (g) => g.properties.name.value.trim() === searchTerm
      );
    }

    if (figure) {
      createPropPane(figure);
    } else {
      closePropPane();
    }
  });
};
