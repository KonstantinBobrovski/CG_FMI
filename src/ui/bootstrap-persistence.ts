import { figuresContainer } from "../figures-container";
import Figure from "../models/figure";
import { Property } from "../models/properties";
import { createPropPane } from "./create-prop-pane";

const svgRoot = document.querySelector("#svg-root")!;
import { figureFactories } from "../factories";
import { dragAndDropBootstrap } from "./drag-and-drop";
import { initFigureEventListeners } from "./figure-listener";

type SaveFile = {
  figuresToSave: {
    type: string;
    properties: Record<string, Property>;
  }[];
  groupsToSave: {
    type: string;
    properties: Record<string, Property>;
    children: {
      type: string;
      properties: Record<string, Property>;
    }[];
  }[];
};

export const bootstrapPersistence = (dragAndDrop: (figure: Figure) => void) => {
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

  const saveFunction = () => {
    const figuresToSave = figuresContainer.figures.map((figure) => ({
      type: figure.constructor.name,
      properties: figure.properties,
    }));
    const groupsToSave = figuresContainer.groups.map((group) => ({
      type: group.constructor.name,
      properties: group.properties,
      children: group.figures.map((figure) => ({
        type: figure.constructor.name,
        properties: figure.properties,
      })),
    }));
    const link = document.createElement("a");
    link.download = "figures.json";
    const toSave: SaveFile = { figuresToSave, groupsToSave };
    const figuresJSON = JSON.stringify(toSave);
    link.href = `data:text/json;charset=utf-8,${encodeURIComponent(
      figuresJSON
    )}`;
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
        const figures = JSON.parse(
          (e.target as FileReader).result as string
        ) as SaveFile;
        figures.figuresToSave.forEach(
          (figure: { type: string; properties: Record<string, Property> }) => {
            const newFigure = figureFactories
              .find(
                (factory) =>
                  factory.constructor.name === figure.type + "Factory"
              )
              ?.createFigure();
            if (!newFigure) {
              alert("failed to import figure: " + figure.type);
              return;
            }
            Object.keys(figure.properties).forEach((key) => {
              const prop = figure.properties[key];
              newFigure.properties[key].value = prop.value;
            });

            newFigure.refreshProperties();
            figuresContainer.add(newFigure);
            initFigureEventListeners(newFigure);
            dragAndDropBootstrap(newFigure);
          }
        );

        figures.groupsToSave.forEach((savedGroup) => {
          const createdGroup = figuresContainer.addGroup(
            savedGroup.properties["groupName"].value || "group"
          );
          Object.keys(savedGroup.properties).forEach((key) => {
            const prop = savedGroup.properties[key];
            createdGroup.properties[key].value = prop.value;
          });
          createdGroup.refreshProperties();
          console.log(createdGroup);

          savedGroup.children.forEach((savedFigure) => {
            const newFigure = figureFactories
              .find(
                (factory) =>
                  factory.constructor.name === savedFigure.type + "Factory"
              )
              ?.createFigure();
            if (!newFigure) {
              alert("failed to import figure: " + savedFigure.type);
              return;
            }
            Object.keys(savedFigure.properties).forEach((key) => {
              const prop = savedFigure.properties[key];
              newFigure.properties[key].value = prop.value;
            });
            newFigure.refreshProperties();
            createdGroup.addFigure(newFigure);
            initFigureEventListeners(newFigure);
            dragAndDropBootstrap(newFigure);
          });
        });

        figuresContainer.refreshOrder();
      });
    });
    input.click();
  };

  document
    .querySelector("#import-json")!
    .addEventListener("click", loadFunction);

  document.addEventListener("keydown", (e) => {
    if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      saveFunction();
    }
  });
};
