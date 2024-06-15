import { figuresContainer } from "../figures-container";
import Figure from "../models/figure";
import Group from "../models/group";
import { createPropPane, closePropPane, createGroupPropPane } from "./create-prop-pane";

const searchInput: HTMLInputElement = document.querySelector("#search-input")!;

export const initializeSearchInput = () => {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = (e.target as HTMLInputElement).value.trim();
    let figure: Figure | Group | undefined = figuresContainer.figures.find(
      (f) => f.properties['name'].value.trim() === searchTerm
    );

    if (!figure) {
      figuresContainer.groups.some((group) => {
        figure = group.figures.find(
          (f) => f.properties['name'].value.trim() === searchTerm
        );
        return figure;
      });
    }

    if (!figure) {
      figure = figuresContainer.groups.find(
        (g) => g.properties['groupName'].value.trim() === searchTerm
      );
    }

    if (figure) {
      if (figure instanceof Group) {
        createGroupPropPane(figure);
      } else {
        createPropPane(figure);
      }
    } else {
      closePropPane();
    }
  });
};
