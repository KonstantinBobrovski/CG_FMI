import { figuresContainer } from "./figures-container";
import { closePropPane, createPropPane } from "./ui/create-prop-pane";
import Figure from "./models/figure";
import { bootstrapPersistence } from "./ui/bootstrap-persistence";
import { Copy, Delete, Paste } from "./ui/actions";
import { figureFactories } from "./factories";
import { SvgInHtml } from "./types/svg";

const figuresChooser = document.querySelector("#figures-chooser")!;
const svgRoot: SvgInHtml = document.querySelector("#svg-root")!;
const searchInput: HTMLInputElement = document.querySelector("#search-input")!;
const tooltip: HTMLElement = document.querySelector("#tooltip")!;

let selectedFigure: Figure | null = null;
let copiedFigure: Figure | null = null;

const createButton = (text: string, className: string, onClick: () => void): HTMLButtonElement => {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = className;
  button.addEventListener("click", onClick);
  return button;
};

const initFigureEventListeners = (figure: Figure) => {
  figure.svgElement.addEventListener("click", () => {
    selectedFigure = figure;
    createPropPane(figure);
  });
};

export const dragAndDropBootstrap = (figure: Figure) => {
  figure.svgElement.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startTranslateY = +figure.properties["translateY"]?.value || 0;
    const startTranslateX = +figure.properties["translateX"]?.value || 0;

    const moveAt = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;
      const ctm = svgRoot.getScreenCTM()!;
      const rotate = +figure.properties["rotate"].value;
      const scaleX = +figure.properties["scaleX"].value;
      const scaleY = +figure.properties["scaleY"].value;
      const radians = rotate * (Math.PI / 180);
      const dx = (currentX - startX) / ctm.a / scaleX;
      const dy = (currentY - startY) / ctm.d / scaleY;
      const rotatedDx = dx * Math.cos(-radians) - dy * Math.sin(-radians);
      const rotatedDy = dx * Math.sin(-radians) + dy * Math.cos(-radians);

      figure.properties["translateX"].value = (startTranslateX + rotatedDx).toString();
      figure.properties["translateY"].value = (startTranslateY + rotatedDy).toString();
      figure.refreshProperties();
    };

    const stopMoving = () => {
      document.removeEventListener("mousemove", moveAt);
      document.removeEventListener("mouseup", stopMoving);
    };

    document.addEventListener("mousemove", moveAt);
    document.addEventListener("mouseup", stopMoving);
  });
};

const initializeFiguresChooser = () => {
  figureFactories.forEach((factory) => {
    const button = createButton(factory.constructor.name, '', () => {
      const newFigure = factory.createFigure();
      initFigureEventListeners(newFigure);
      figuresContainer.add(newFigure);
      dragAndDropBootstrap(newFigure);
    });
    figuresChooser.appendChild(button);
  });
};

const initializeSearchInput = () => {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = (e.target as HTMLInputElement).value.trim();
    const figure = figuresContainer.figures.find(f => f.properties.name.value.trim() === searchTerm);
    if (figure) {
      createPropPane(figure);
    } else {
      closePropPane();
    }
  });
};

const initializeSvgRoot = () => {
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
      svgRoot.style.transformOrigin = `0% 0%`;
    }
    svgRoot.style.transform = `scale(${scale})`;
  };

  svgRoot.addEventListener("wheel", zoom);

  svgRoot.addEventListener("click", (e) => {
    if ((e.target as HTMLElement) === svgRoot) {
      closePropPane();
      tooltip.style.display = "none";
    }
  });

  svgRoot.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    tooltip.style.left = `${mouseX}px`;
    tooltip.style.top = `${mouseY}px`;
    tooltip.style.display = "flex";
    tooltip.style.flexDirection = "column";
    tooltip.style.gap = "10px";

    const insertButton = createButton("Insert", "", () => {
      //add new figure
    });

    const copyButton = createButton("Copy", "", () => {
      if (selectedFigure) {
        copiedFigure = Copy(selectedFigure);
        copiedFigure?.svgElement.addEventListener("click", () => {
          createPropPane(selectedFigure!);
          selectedFigure = copiedFigure;
        });
      }
      tooltip.style.display = "none";
    });

    const pasteButton = createButton("Paste", "", () => {
      Paste(copiedFigure);
      tooltip.style.display = "none";
    });

    const deleteButton = createButton("Delete", "", () => {
      Delete(selectedFigure);
      tooltip.style.display = "none";
    });

    tooltip.innerHTML = "";
    tooltip.appendChild(insertButton);
    tooltip.appendChild(copyButton);
    tooltip.appendChild(pasteButton);
    tooltip.appendChild(deleteButton);
  });
};

const initializeKeyboardShortcuts = () => {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Delete") {
      Delete(selectedFigure);
      return;
    }
    if (!event.ctrlKey) {
      return;
    }
    if (event.key === "v") {
      Paste(copiedFigure);
      return;
    }
    if (event.key === "c" && selectedFigure) {
      copiedFigure = Copy(selectedFigure);
      copiedFigure?.svgElement.addEventListener("click", () => {
        selectedFigure = copiedFigure;
        createPropPane(copiedFigure!);
      });
    }
  });
};

const bootstrap = () => {
  initializeFiguresChooser();
  bootstrapPersistence(dragAndDropBootstrap);
  initializeSvgRoot();
  initializeSearchInput();
  initializeKeyboardShortcuts();
};

bootstrap();