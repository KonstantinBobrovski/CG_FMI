import Figure from "../models/figure";
import {
  Property,
  NumberProperty,
  PercentageProperty,
  EnumProperty,
} from "../models/propertie";
import { Rectangle } from "../models/rectangle";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory, onCreateElement } from "./base-figure.factory";

export class RectangleFactory extends BaseFigureFactory<Figure> {
  createFigure(): Figure {
    const element = document.createElementNS(
      BaseFigureFactory.svgNS,
      "rect"
    ) as SvgInHtml;

    const rectangle = new Rectangle(element);
    rectangle.properties = this.getProperties();
    rectangle.refreshProperties();
    return rectangle;
  }

  getProperties(): Record<string, Property> {
    return [
      new NumberProperty("x", 50),
      new NumberProperty("y", 50),
      new NumberProperty("width", 100),
      new NumberProperty("height", 100),
      new PercentageProperty("opacity", 1),
      new NumberProperty("rotate", 0),
      new EnumProperty(
        "transform-origin",
        "center",
        ["center", "top", "bottom", "left", "right"],
        "rotate-point"
      ),
      new NumberProperty("z-index", onCreateElement(), "z-index"),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: { ...curr } }), {});
  }
}
