import { BaseFigureFactory } from "../factories/base-figure.factory";
import { SvgInHtml } from "../types/svg";
import { ColorProperty, NumberProperty, Property } from "./propertie";
abstract class Figure {
  public properties: Record<string, Property> = {};
  refreshProperties(): void {
    Object.keys(this.properties).forEach((key) => {
      const el = this.properties[key];
      this.svgElement.setAttributeNS(null, el.name, el.value);
    });
  }
  constructor(public svgElement: SvgInHtml) {}
}

export default Figure;
