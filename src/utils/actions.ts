import { dragAndDropBootstrap } from "..";
import { BaseFigureFactory } from "../factories/base-figure.factory";
import { CircleFactory } from "../factories/circle.factory";
import { EllipseFactory } from "../factories/ellipse.factory";
import { LineFactory } from "../factories/line.factory";
import { PolygonFactory } from "../factories/polygon.factory";
import { RectangleFactory } from "../factories/rectangle.factory";
import { figuresContainer } from "../figures-container";
import { Circle } from "../models/circle";
import { Ellipse } from "../models/ellipse";
import Figure from "../models/figure";
import { Line } from "../models/line";
import { Polygon } from "../models/polygon";
import {
  ColorProperty,
  NameProperty,
  NumberProperty,
} from "../models/properties";
import { Rectangle } from "../models/rectangle";
import { closePropPane, createPropPane } from "../ui/create-prop-pane";
import { figureFactories } from "../factories";
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
    copiedFigure!.properties[key] = {
      ...selectedFigure!.properties[key],
    } as any;
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
