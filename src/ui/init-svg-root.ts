import { figureFactories } from "../factories";
import { figuresContainer } from "../figures-container";
import { SvgInHtml } from "../types/svg";
import { Copy, Paste, Delete } from "./actions";
import { getCopiedFigure, setCopiedFigure } from "./copied-figure";
import { createButton } from "./create-button";
import { closePropPane, createPropPane } from "./create-prop-pane";
import { dragAndDropBootstrap } from "./drag-and-drop";
import { initFigureEventListeners } from "./figure-listener";
import { getSelectedFigure, setSelectedFigure } from "./selected-figure";
import { changeToSvgCoordinates } from "./to-svg-coordinates";
const tooltip: HTMLElement = document.querySelector("#tooltip")!;
const svgRoot: SvgInHtml = document.querySelector("#svg-root")!;

export const initializeSvgRoot = () => {
  let scale = 1;
  const scaleFactor = 1.1;

  const zoom = (event: WheelEvent) => {
    event.preventDefault();

    const { left, top, width, height } = svgRoot.getBoundingClientRect();
    const { clientX, clientY, deltaY } = event;

    const scaleFactor = deltaY < 0 ? 1.1 : 1 / 1.1;
    const zoomScale = scale * scaleFactor;

    const xOffset = (clientX - left) / width;
    const yOffset = (clientY - top) / height;

    const originX = xOffset * 100;
    const originY = yOffset * 100;

    scale = Math.max(zoomScale, 1);
    svgRoot.style.transformOrigin = `${originX}% ${originY}%`;
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

    const insertButton = createButton("Insert", "", () => {
      tooltip.innerHTML = "";
      figureFactories.forEach((factory) => {
        const factoryButton = createButton(
          factory.constructor.name.replace("Factory", ""),
          "",
          () => {
            const newFigure = factory.createFigure();
            changeToSvgCoordinates(mouseX, mouseY, newFigure);
            initFigureEventListeners(newFigure);
            dragAndDropBootstrap(newFigure);
            newFigure.refreshProperties();
            figuresContainer.add(newFigure);
            tooltip.style.display = "none";
          }
        );
        tooltip.appendChild(factoryButton);
      });
    });

    const copyButton = createButton("Copy", "", () => {
      tooltip.style.display = "none";
      const selectedFigure = getSelectedFigure();
      if (!selectedFigure) return;

      const t = Copy(selectedFigure);
      setCopiedFigure(t);
      t?.svgElement.addEventListener("click", () => {
        createPropPane(t!);
        setSelectedFigure(t);
      });
    });

    const pasteButton = createButton("Paste", "", () => {
      const copiedFigure = getCopiedFigure();
      Paste(copiedFigure);
      changeToSvgCoordinates(mouseX, mouseY, copiedFigure!);
      copiedFigure?.refreshProperties();
      tooltip.style.display = "none";
    });

    const deleteButton = createButton("Delete", "", () => {
      Delete(getSelectedFigure());
      tooltip.style.display = "none";
    });

    // Check them that way to maintain the order
    tooltip.innerHTML = "";
    tooltip.appendChild(insertButton);
    if ((e.target as HTMLElement) !== svgRoot) {
      tooltip.appendChild(copyButton);
    }
    if (getCopiedFigure()) {
      tooltip.appendChild(pasteButton);
    }
    if ((e.target as HTMLElement) !== svgRoot) {
      tooltip.appendChild(deleteButton);
    }
  });
};
