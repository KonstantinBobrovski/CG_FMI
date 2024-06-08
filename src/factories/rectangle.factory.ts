import { Property, NumberProperty } from "../models/properties";
import { Rectangle } from "../models/rectangle";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory } from "./base-figure.factory";

export class RectangleFactory extends BaseFigureFactory<Rectangle> {
  createFigure(): Rectangle {
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
    const currentProps = [
      new NumberProperty("x", 50),
      new NumberProperty("y", 50),
      new NumberProperty("width", 100),
      new NumberProperty("height", 100),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: curr }), {});
    return {
      ...BaseFigureFactory.getBaseProperties("rectangle"),
      ...currentProps,
    };
  }
}
