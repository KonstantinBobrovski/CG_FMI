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

      dragAndDrop(newFigure);
    });
    figuresChooser?.appendChild(button);
  });

  document.querySelector("#download-png")!.addEventListener("click", () => {
    const svgData = new XMLSerializer().serializeToString(svgRoot);
    const svgDataBase64 = btoa(unescape(encodeURIComponent(svgData)));
    const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`;

    const image = new Image();

    image.addEventListener("load", () => {
      const rect = svgRoot.getBoundingClientRect();
      const width = rect.width || 1000;
      const height = rect.height || 500;

      const canvas = document.createElement("canvas")!;

      canvas.setAttribute("width", width.toString());
      canvas.setAttribute("height", height.toString());

      const context = canvas.getContext("2d")!;
      context.drawImage(image, 0, 0, width, height);

      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = "image.png";
      link.href = dataUrl;
      link.click();
    });

    image.src = svgDataUrl;
  });
};

const saveFunction = () => {
  const figuresToSave = figuresContainer.figures.map((figure) => ({
    type: figure.constructor.name,
    properties: figure.properties,
  }));
  const link = document.createElement("a");
  link.download = "figures.json";
  const figuresJSON = JSON.stringify(figuresToSave);
  link.href = `data:text/json;charset=utf-8,${encodeURIComponent(figuresJSON)}`;
  link.click();
};

document
  .querySelector("#download-json")!
  .addEventListener("click", saveFunction);

const loadFunction = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";

  input.addEventListener("change", (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsText(file);
    reader.addEventListener("load", (e) => {
      figuresContainer.figures = [];
      const figures = JSON.parse((e.target as FileReader).result as string);
      figures.forEach(
        (figure: { type: string; properties: Record<string, Property> }) => {
          const newFigure = figureFactories
            .find(
              (factory) => factory.constructor.name === figure.type + "Factory"
            )
            ?.createFigure();
          if (!newFigure) {
            alert("failed to import figure: " + figure.type);
            return;
          }
          newFigure.properties = figure.properties;
          newFigure.refreshProperties();
          newFigure.svgElement.addEventListener("click", () =>
            createPropPane(newFigure)
          );
          figuresContainer.add(newFigure);

          dragAndDrop(newFigure);
        }
      );
      figuresContainer.refreshOrder();
    });
  });
  input.click();
};

document.querySelector("#import-json")!.addEventListener("click", loadFunction);

document.addEventListener("keydown", (e) => {
  if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    saveFunction();
  }
});

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
