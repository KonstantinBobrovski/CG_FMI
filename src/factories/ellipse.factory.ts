import { NumberProperty, Property } from "../models/properties";
import { Ellipse } from "../models/ellipse";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory } from "./base-figure.factory";

export class EllipseFactory extends BaseFigureFactory<Ellipse> {
  createFigure(): Ellipse {
    const element = document.createElementNS(
      BaseFigureFactory.svgNS,
      "ellipse"
    ) as SvgInHtml;

    const ellipse = new Ellipse(element);
    ellipse.properties = this.getProperties();
    ellipse.refreshProperties();
    return ellipse;
  }

  getProperties(): Record<string, Property> {
    const currentProps = [
      new NumberProperty("rx", Math.floor(Math.random() * 50) + 20),
      new NumberProperty("ry", Math.floor(Math.random() * 50) + 20),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: { ...curr } }), {});

    return { ...BaseFigureFactory.getBaseProperties("ellipse"), ...currentProps };
  }
}
