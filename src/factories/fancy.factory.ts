import { Fancy } from "../models/fancy";
import { Line } from "../models/line";
import { Property, NumberProperty } from "../models/properties";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory, onCreateElement } from "./base-figure.factory";

export class FancyFactory extends BaseFigureFactory<Fancy> {
  constructor() {
    super();
  }

  createFigure(): Fancy {
    const element = document.createElementNS(
      BaseFigureFactory.svgNS,
      "g"
    ) as SvgInHtml;

    const circle = document.createElementNS(
      BaseFigureFactory.svgNS,
      "circle"
    ) as SvgInHtml;

    const lineElement1 = document.createElementNS(
      BaseFigureFactory.svgNS,
      "line"
    ) as SvgInHtml;

    const lineElement2 = document.createElementNS(
      BaseFigureFactory.svgNS,
      "line"
    ) as SvgInHtml;

    element.appendChild(circle);
    element.appendChild(lineElement1);
    element.appendChild(lineElement2);

    circle.setAttributeNS(null, "cx", 50 + -6.413442227510896 + "");
    circle.setAttributeNS(null, "cy", 50 + 11.408433044163994 + "");
    circle.setAttributeNS(null, "r", "10");
    circle.setAttributeNS(null, "fill", "white");

    lineElement1.setAttributeNS(null, "x1", "33.576555500558456");
    lineElement1.setAttributeNS(null, "x2", "50.576555500558456");
    lineElement1.setAttributeNS(null, "y1", 56 + 5.75097216207177 + "");
    lineElement1.setAttributeNS(null, "y2", 49 + 5.75097216207177 + "");

    lineElement2.setAttributeNS(null, "x1", "36.620748909726466");
    lineElement2.setAttributeNS(null, "x2", 17 + 36.620748909726466 + "");
    lineElement2.setAttributeNS(null, "y1", 61.351415359627424 + 7 + "");
    lineElement2.setAttributeNS(null, "y2", 61.351415359627424 + "");

    const line = new Fancy(element);
    line.properties = this.getProperties();
    line.refreshProperties();
    return line;
  }

  getProperties(): Record<string, Property> {
    const currentProps = [
      new NumberProperty("x1", 0),
      new NumberProperty("y1", 0),
      new NumberProperty("x2", 50),
      new NumberProperty("y2", 50),
      new NumberProperty("z-index", onCreateElement(), "z-index"),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: curr }), {});

    return {
      ...Object.fromEntries(
        Object.entries(BaseFigureFactory.getBaseProperties("fancy")).filter(
          ([key]) => key !== "fill"
        )
      ),
    };
  }
}
