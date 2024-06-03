import Figure from "../models/figure";
import { Property, StringProperty } from "../models/properties";
import { Polygon } from "../models/polygon";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory } from "./base-figure.factory";

export class PolygonFactory extends BaseFigureFactory<Figure> {
  createFigure(): Figure {
    const element = document.createElementNS(
      BaseFigureFactory.svgNS,
      "polygon"
    ) as SvgInHtml;

    const polygon = new Polygon(element);
    polygon.properties = this.getProperties();
    polygon.refreshProperties();
    return polygon;
  }

  getProperties(): Record<string, Property> {
    const isTriangle = Math.random() < 0.5;
    const pointsValue = isTriangle
      ? "50,15 90,100 10,100"
      : "20,20 80,20 100,40 80,60 20,60 0,40";

    const currentProps = [
      new StringProperty("points", pointsValue),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: { ...curr } }), {});

    return { ...BaseFigureFactory.getBaseProperties(), ...currentProps };
  }
}
