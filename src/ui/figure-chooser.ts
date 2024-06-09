import { figureFactories } from "../factories";
import { figuresContainer } from "../figures-container";
import { createButton } from "./create-button";
import { dragAndDropBootstrap } from "./drag-and-drop";
import { initFigureEventListeners } from "./figure-listener";
const figuresChooser = document.querySelector("#figures-chooser")!;

export const initializeFiguresChooser = () => {
  figureFactories.forEach((factory) => {
    const button = createButton(factory.constructor.name, "", () => {
      const newFigure = factory.createFigure();
      initFigureEventListeners(newFigure);
      figuresContainer.add(newFigure);
      dragAndDropBootstrap(newFigure);
    });
    figuresChooser.appendChild(button);
  });
};
