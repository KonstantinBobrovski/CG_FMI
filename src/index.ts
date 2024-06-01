import { BaseFigureFactory } from "./factories/base-figure.factory";
import { CircleFactory } from "./factories/circle.factory";
import { LineFactory } from "./factories/line.factory";
import { RectangleFactory } from "./factories/rectangle.factory";
import { figuresContainer } from "./figures-container";

import Figure from "./models/figure";
import { EnumProperty, Property, ValueType } from "./models/propertie";
import { SvgInHtml } from "./types/svg";
import { createPropPane } from "./ui/create-prop-pane";

const figureFactories: BaseFigureFactory<Figure>[] = [
  new CircleFactory(),
  new RectangleFactory(),
  new LineFactory(),
];

const figuresChooser = document.querySelector("#figures-chooser")!;
const template = document.querySelector("#input-template")!;
const propertiesTab = document.querySelector("#properties-tab")!;

const bootstrap = () => {
  figureFactories.forEach((figure) => {
    const button = document.createElement("button");
    button.textContent = figure.constructor.name;
    button.addEventListener("click", () => {
      const newFigure = figure.createFigure();
      newFigure.svgElement.addEventListener("click", () =>
        createPropPane(newFigure)
      );
      figuresContainer.add(newFigure);
    });
    figuresChooser?.appendChild(button);
  });
};

bootstrap();
