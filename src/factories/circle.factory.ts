import { Circle } from "../models/circle";
import {
  NumberProperty,
  Property,
} from "../models/properties";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory } from "./base-figure.factory";

export class CircleFactory implements BaseFigureFactory<Circle> {
  createFigure(): Circle {
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
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: { ...curr } }), {});

    return { ...BaseFigureFactory.getBaseProperties("circle"), ...currentProps };
  }
}
