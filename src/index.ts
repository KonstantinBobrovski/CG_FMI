import { BaseFigureFactory } from "./factories/base-figure.factory";
import { CircleFactory } from "./factories/circle.factory";
import { LineFactory } from "./factories/line.factory";
import { RectangleFactory } from "./factories/rectangle.factory";
import { PolygonFactory } from "./factories/polygon.factory";
import { EllipseFactory } from "./factories/ellipse.factory";
import { figuresContainer } from "./figures-container";

import Figure from "./models/figure";
import { createPropPane } from "./ui/create-prop-pane";
import { bootstrapPersistence } from "./ui/bootstrap-persistence";
import { Circle } from "./models/circle";
import { NumberProperty } from "./models/properties";
import { Ellipse } from "./models/ellipse";
import { Line } from "./models/line";
import { Rectangle } from "./models/rectangle";
import { Polygon } from "./models/polygon";

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
const svgRoot: HTMLElement = document.querySelector("#svg-root")!;
const searchInput: HTMLInputElement = document.querySelector("#search-input")!;

let selectedFigure: Figure | null = null;
let copiedFigure: Figure | null = null;
const dragAndDropBootstrap = (figure: Figure) => {
  figure.svgElement.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const startY = e.clientY;

    const startTranslateY = +figure.properties["translateY"]?.value || 0;
    const startTranslateX = +figure.properties["translateX"]?.value || 0;

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

const bootstrap = () => {
  figureFactories.forEach((figure) => {
    const button = document.createElement("button");
    button.textContent = figure.constructor.name;
    button.addEventListener("click", () => {
      const newFigure = figure.createFigure();
      newFigure.svgElement.addEventListener("click", () => {
        selectedFigure = newFigure;
        createPropPane(newFigure);
      });
      figuresContainer.add(newFigure);

      dragAndDropBootstrap(newFigure);
    });
    figuresChooser?.appendChild(button);
  });
  bootstrapPersistence(figureFactories, dragAndDropBootstrap);

  svgRoot.addEventListener("wheel", zoom);
};
let scale = 1;
const scaleFactor = 1.1;
const zoom = (e: WheelEvent) => {
  e.preventDefault();

  const rect = svgRoot.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const offsetY = e.clientY - rect.top;

  const oldScale = scale;

  scale = e.deltaY < 0 ? scale * scaleFactor : scale / scaleFactor;

  const originX = (offsetX / rect.width) * 100;
  const originY = (offsetY / rect.height) * 100;

  svgRoot.style.transformOrigin = `${originX}% ${originY}%`;
  if (scale < 1) {
    scale = 1;
    svgRoot.style.transformOrigin = `${0}% ${0}%`;
  }
  svgRoot.style.transform = `scale(${scale})`;
};

svgRoot.addEventListener("wheel", zoom);

searchInput.addEventListener('input', (e) => {
  const searchTerm = (e.target as HTMLInputElement).value.trim();

  const figure = figuresContainer.figures.find((figure) => figure.properties.name.value.trim() === searchTerm);
  if (figure) {
    createPropPane(figure);
  } else {
    //!!! Add here the close prop pane from the other PR.
  }
});

bootstrap();

// Copy
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'c') {
    if (selectedFigure) {
      let figureFactory = null;

      if (selectedFigure instanceof Circle) {
        figureFactory = new CircleFactory();
      } else if (selectedFigure instanceof Ellipse) {
        figureFactory = new EllipseFactory();
      } else if (selectedFigure instanceof Rectangle) {
        figureFactory = new RectangleFactory();
      } else if (selectedFigure instanceof Line) {
        figureFactory = new LineFactory();
      } else if (selectedFigure instanceof Polygon) {
        figureFactory = new PolygonFactory();
      }

      if (figureFactory) {
        copiedFigure = figureFactory.createFigure();
        copiedFigure.properties = {...selectedFigure.properties, ...figureFactory.getProperties()};
        copiedFigure.properties["translateX"] = new NumberProperty("translateX", 0, "Translate X");
        copiedFigure.properties["translateY"] = new NumberProperty("translateY", 0, "Translate Y");
        copiedFigure.refreshProperties();

        copiedFigure.svgElement.addEventListener("click", () => {
          createPropPane(copiedFigure!);
        });
      }
    }
  }
});

// Paste
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'v') {
    if (copiedFigure) {
      figuresContainer.add(copiedFigure!);
      dragAndDropBootstrap(copiedFigure!);
    }
  }
});

// Delete
document.addEventListener('keydown', (event) => {
  if (event.key === 'Delete') {
    figuresContainer.figures = figuresContainer.figures.filter((f) => f !== selectedFigure);
    selectedFigure = null;
    figuresContainer.refreshOrder();
  }
});