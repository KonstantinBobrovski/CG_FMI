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

    const rotate = this.properties["rotate"];

    const rotateOrigin = this.properties["transform-origin"];
    this.svgElement.style.transformOrigin = rotateOrigin as any;
    const scaleX = this.properties["scaleX"];
    const scaleY = this.properties["scaleY"];
    const transforms: string[] = [];
    if (scaleX || scaleY) {
      transforms.push(` scale(${scaleX.value}, ${scaleY.value})`);
    }

    if (rotate && rotateOrigin) {
      transforms.push(`rotate(${rotate.value})`);
    }

    this.svgElement.setAttributeNS(null, "transform", transforms.join(" "));
  }
  constructor(public svgElement: SvgInHtml) {}
}

export default Figure;
