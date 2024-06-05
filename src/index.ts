import { BaseFigureFactory } from "./factories/base-figure.factory";
import { CircleFactory } from "./factories/circle.factory";
import { LineFactory } from "./factories/line.factory";
import { RectangleFactory } from "./factories/rectangle.factory";
import { PolygonFactory } from "./factories/polygon.factory";
import { EllipseFactory } from "./factories/ellipse.factory";
import { figuresContainer } from "./figures-container";
import { closePropPane, createPropPane } from "./ui/create-prop-pane";
import Figure from "./models/figure";
import { bootstrapPersistence } from "./ui/bootstrap-persistence";
import { Copy, Delete, Paste } from "./utils/actions";

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

const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.background = '#fff';
tooltip.style.border = '1px solid #000';
tooltip.style.padding = '5px';
tooltip.style.display = 'none';
document.body.appendChild(tooltip);

let selectedFigure: Figure | null = null;
let copiedFigure: Figure | null = null;
export const dragAndDropBootstrap = (figure: Figure) => {
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
      selectedFigure = newFigure;
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
    closePropPane();
  }
});

svgRoot.addEventListener('click', (e) => {
  if ((e.target as HTMLElement) === svgRoot) {
    closePropPane();
    tooltip.style.display = 'none';
  }
});

svgRoot.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  tooltip.style.left = mouseX + 'px';
  tooltip.style.top = mouseY + 'px';
  tooltip.style.display = 'flex';
  tooltip.style.flexDirection = 'column';
  tooltip.style.gap = '10px';

  const insertButton = document.createElement('button');
  insertButton.textContent = 'Insert';
  insertButton.addEventListener('click', () => {
    //add new figure
  });

  const copyButton = document.createElement('button');
  copyButton.textContent = 'Copy';
  copyButton.addEventListener('click', () => {
    if (selectedFigure) {
      copiedFigure = Copy(selectedFigure);
      copiedFigure?.svgElement.addEventListener("click", () => {
        createPropPane(selectedFigure!);
        selectedFigure = copiedFigure;
      });
    }
    tooltip.style.display = 'none';
  });

  const pasteButton = document.createElement('button');
  pasteButton.textContent = 'Paste';
  pasteButton.addEventListener('click', () => {
    Paste(copiedFigure);
    tooltip.style.display = 'none';
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    Delete(selectedFigure);
    tooltip.style.display = 'none';
  });

  tooltip.innerHTML = '';
  tooltip.appendChild(insertButton);
  tooltip.appendChild(copyButton);
  tooltip.appendChild(pasteButton);
  tooltip.appendChild(deleteButton);
});

bootstrap();

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey) {
    if (event.key === 'c') {
      copiedFigure = Copy(selectedFigure);
      copiedFigure?.svgElement.addEventListener("click", () => {
        selectedFigure = copiedFigure;
        createPropPane(copiedFigure!);
      });
    } else if (event.key === 'v') {
      Paste(copiedFigure);
    }
  } else if (event.key === 'Delete') {
    Delete(selectedFigure);
  }
});
