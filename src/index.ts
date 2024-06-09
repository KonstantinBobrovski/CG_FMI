import { figuresContainer } from "./figures-container";
import { closePropPane, createPropPane } from "./ui/create-prop-pane";
import Figure from "./models/figure";
import { bootstrapPersistence } from "./ui/bootstrap-persistence";
import { Copy, Delete, Paste } from "./ui/actions";
import { figureFactories } from "./factories";
import { SvgInHtml } from "./types/svg";
import Group from "./models/group";
import { createButton } from "./ui/create-button";
import { setSelectedFigure, getSelectedFigure } from "./ui/selected-figure";
import { dragAndDropBootstrap } from "./ui/drag-and-drop";
import { getCopiedFigure, setCopiedFigure } from "./ui/copied-figure";
import { initializeFiguresChooser } from "./ui/figure-chooser";
import { initializeSvgRoot } from "./ui/init-svg-root";
import { initializeSearchInput } from "./ui/search-bar";

const svgRoot: SvgInHtml = document.querySelector("#svg-root")!;

const initializeKeyboardShortcuts = () => {
  document.addEventListener("keydown", (event) => {
    const selectedFigure = getSelectedFigure();
    if (event.key === "Delete") {
      Delete(selectedFigure);
      return;
    }
    if (!event.ctrlKey) {
      return;
    }
    if (event.key === "v") {
      Paste(getCopiedFigure());
      return;
    }
    if (event.key === "c" && selectedFigure) {
      const t = Copy(selectedFigure);
      setCopiedFigure(t);
      t?.svgElement.addEventListener("click", () => {
        setSelectedFigure(t);
        createPropPane(t!);
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
