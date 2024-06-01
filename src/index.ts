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

      newFigure.svgElement.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const startY = e.clientY;

        const startTranslateY = +newFigure.properties["translateY"].value || 0;
        const startTranslateX = +newFigure.properties["translateX"].value || 0;

        const moveAt = (e: MouseEvent) => {
          const currentX = e.clientX;
          const currentY = e.clientY;

          const ctm = (newFigure.svgElement as any).getScreenCTM();

          const dx = (currentX - startX) / ctm.a;
          const dy = (currentY - startY) / ctm.d;

          newFigure.properties["translateX"].value = startTranslateX + dx + "";
          newFigure.properties["translateY"].value = startTranslateY + dy + "";
          newFigure.refreshProperties();
        };
        const stopMoving = (e: MouseEvent) => {
          document.removeEventListener("mousemove", moveAt);
          document.removeEventListener("mouseup", stopMoving);
        };
        document.addEventListener("mousemove", moveAt);
        document.addEventListener("mouseup", stopMoving);
      });
    });
    figuresChooser?.appendChild(button);
  });
};

bootstrap();
