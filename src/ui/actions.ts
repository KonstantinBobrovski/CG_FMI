import { figuresContainer } from "../figures-container";

import Figure from "../models/figure";

import { NameProperty, NumberProperty, Property } from "../models/properties";

import { closePropPane } from "./create-prop-pane";
import { figureFactories } from "../factories";
import { dragAndDropBootstrap } from "./drag-and-drop";
export function Copy(selectedFigure: Figure): Figure | null {
  let copiedFigure: Figure | null = null;

  const figureFactory = figureFactories.find(
    (factory) =>
      factory.constructor.name === selectedFigure.constructor.name + "Factory"
  );

  if (!figureFactory) {
    return null;
  }

  copiedFigure = figureFactory.createFigure();
  copiedFigure!.properties = {};
  Object.keys(selectedFigure.properties).map((key) => {
    const property = {
      ...selectedFigure!.properties[key],
    };
    const withProto = Object.setPrototypeOf(
      property,
      Object.getPrototypeOf(selectedFigure!.properties[key])
    ) as Property;
    copiedFigure!.properties[key] = withProto;
  });
  copiedFigure!.properties["name"] = new NameProperty(
    "name",
    `${copiedFigure.properties["name"].value}-copy`
  );
  copiedFigure.properties["translateX"] = new NumberProperty(
    "translateX",
    0,
    "Translate X"
  );
  copiedFigure.properties["translateY"] = new NumberProperty(
    "translateY",
    0,
    "Translate Y"
  );

  // add needed properties
  copiedFigure.refreshProperties();

  return copiedFigure;
}

export function Paste(copiedFigure: Figure | null): void {
  if (copiedFigure && !figuresContainer.figures.includes(copiedFigure)) {
    figuresContainer.add(copiedFigure!);
    dragAndDropBootstrap(copiedFigure!);
  } else if (copiedFigure) {
    copiedFigure = Copy(copiedFigure);

    Paste(copiedFigure);
  }
}

export function Delete(selectedFigure: Figure | null): void {
  figuresContainer.figures = figuresContainer.figures.filter(
    (f) => f !== selectedFigure
  );
  figuresContainer.refreshOrder();
  closePropPane();
}
