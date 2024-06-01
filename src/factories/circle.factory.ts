import { Circle } from "../models/circle";
import Figure from "../models/figure";
import {
  ColorProperty,
  NumberProperty,
  PercentageProperty,
  Property,
  StringProperty,
} from "../models/propertie";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory, onCreateElement } from "./base-figure.factory";

export class CircleFactory implements BaseFigureFactory<Circle> {
  createFigure(): Figure {
    const element = document.createElementNS(
      BaseFigureFactory.svgNS,
      "circle"
    ) as SvgInHtml;

    const circle = new Circle(element);
    circle.properties = this.getProperties();
    circle.refreshProperties();
    return circle;
  }
  getProperties(): Record<string, Property> {
    const currentProps = [
      new NumberProperty("cx", 50, "x"),
      new NumberProperty("cy", 50, "y"),
      new NumberProperty("r", 10, "radius"),
      new ColorProperty("fill", "red"),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: { ...curr } }), {});

    return { ...BaseFigureFactory.getBaseProperties(), ...currentProps };
  }
}
