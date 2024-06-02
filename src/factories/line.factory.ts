import { Line } from "../models/line";
import { Property, NumberProperty, ColorProperty } from "../models/propertie";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory, onCreateElement } from "./base-figure.factory";

export class LineFactory extends BaseFigureFactory<Line> {
  constructor() {
    super();
  }

  createFigure(): Line {
    const element = document.createElementNS(
      BaseFigureFactory.svgNS,
      "line"
    ) as SvgInHtml;

    const line = new Line(element);
    line.properties = this.getProperties();
    line.refreshProperties();
    return line;
  }

  getProperties(): Record<string, Property> {
    const currentProps = [
      new NumberProperty("x1", 50),
      new NumberProperty("y1", 50),
      new NumberProperty("x2", 100),
      new NumberProperty("y2", 100),
      new ColorProperty("stroke", "black"),
      new NumberProperty("z-index", onCreateElement(), "z-index"),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: { ...curr } }), {});
    return { ...BaseFigureFactory.getBaseProperties(), ...currentProps };
  }
}