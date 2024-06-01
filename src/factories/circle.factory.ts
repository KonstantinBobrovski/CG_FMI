import { Circle } from "../models/circle";
import Figure from "../models/figure";
import { ColorProperty, NumberProperty, Property } from "../models/propertie";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory } from "./base-figure.factory";

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
    return [
      new NumberProperty("cx", 50),
      new NumberProperty("cy", 50),
      new NumberProperty("r", 10),
      new ColorProperty("fill", "black"),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: { ...curr } }), {});
  }
}
