import { BaseFigureFactory } from "./factories/base-figure.factory";
import { CircleFactory } from "./factories/circle.factory";
import { LineFactory } from "./factories/line.factory";
import { RectangleFactory } from "./factories/rectangle.factory";
import { PolygonFactory } from "./factories/polygon.factory";
import { EllipseFactory } from "./factories/ellipse.factory";
import { figuresContainer } from "./figures-container";

import Figure from "./models/figure";
import { createPropPane } from "./ui/create-prop-pane";
import { Property } from "./models/properties";
import { bootstrapPersistence } from "./ui/bootstrap-persistence";

const figureFactories: BaseFigureFactory<Figure>[] = [
  new CircleFactory(),
  new RectangleFactory(),
  new LineFactory(),
  new PolygonFactory(),
  new EllipseFactory(),
];

const figuresChooser = document.querySelector("#figures-chooser")!;
const template = document.querySelector("#input-template")!;
const propertiesTab = document.querySelector("#properties-tab")!;
const svgRoot = document.querySelector("#svg-root")!;

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

      dragAndDropBootstrap(newFigure);
    });
    figuresChooser?.appendChild(button);
  });
  bootstrapPersistence(figureFactories, dragAndDropBootstrap);
};

const dragAndDropBootstrap = (figure: Figure) => {
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
      const radians = rotate * (Math.PI / 180);

      const dx = (currentX - startX) / ctm.a;
      const dy = (currentY - startY) / ctm.d;

      const rotatedDx = dx * Math.cos(-radians) - dy * Math.sin(-radians);
      const rotatedDy = dx * Math.sin(-radians) + dy * Math.cos(-radians);

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
