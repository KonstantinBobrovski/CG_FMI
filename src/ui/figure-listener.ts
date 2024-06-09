import Figure from "../models/figure";
import { createPropPane } from "./create-prop-pane";
import { setSelectedFigure } from "./selected-figure";

export const initFigureEventListeners = (figure: Figure) => {
  figure.svgElement.addEventListener("click", () => {
    setSelectedFigure(figure);

    createPropPane(figure);
  });
};
