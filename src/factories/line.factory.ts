import { Line } from "../models/line";
import { Property, NumberProperty } from "../models/properties";
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
      new NumberProperty("x1", 0, "x1", -100),
      new NumberProperty("y1", 0, "y1", -100),
      new NumberProperty("x2", 50, "x2", -100),
      new NumberProperty("y2", 50, "y2", -100),
      new NumberProperty("z-index", onCreateElement(), "z-index"),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: curr }), {});

    return {
      ...Object.fromEntries(
        Object.entries(BaseFigureFactory.getBaseProperties("line")).filter(
          ([key]) => key !== "fill"
        )
      ),
      ...currentProps,
    };
  }
}
