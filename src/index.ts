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
const svgRoot = document.querySelector("#svg-root")!;

let lastSelectedSvg: SvgInHtml | null = null;

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

      dragAndDrop(newFigure);
    });
    figuresChooser?.appendChild(button);
  });
};

const dragAndDrop = (figure: Figure) => {
  figure.svgElement.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const startTranslateY = +figure.properties["translateY"].value || 0;
    const startTranslateX = +figure.properties["translateX"].value || 0;

    const moveAt = (e: MouseEvent) => {
      let currentX = e.clientX;
      let currentY = e.clientY;

      const ctm = (svgRoot as any).getScreenCTM();

      const rotate = +figure.properties["rotate"].value;
      const radians = rotate * (Math.PI / 180); // Convert degrees to radians

      // Calculate deltas in the global coordinate system
      const dx = (currentX - startX) / ctm.a;
      const dy = (currentY - startY) / ctm.d;
      console.log(Math.cos(-radians), Math.sin(-radians));

      // Apply inverse rotation transformation
      const rotatedDx = dx * Math.cos(-radians) - dy * Math.sin(-radians);
      const rotatedDy = dx * Math.sin(-radians) + dy * Math.cos(-radians);

      // Update the translation properties
      figure.properties["translateX"].value = startTranslateX + rotatedDx + "";
      figure.properties["translateY"].value = startTranslateY + rotatedDy + "";
      figure.refreshProperties();
    };
    const stopMoving = (e: MouseEvent) => {
      document.removeEventListener("mousemove", moveAt);
      document.removeEventListener("mouseup", stopMoving);
    };
    document.addEventListener("mousemove", moveAt);
    document.addEventListener("mouseup", stopMoving);
  });
};

bootstrap();
