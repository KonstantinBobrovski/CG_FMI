import { SvgInHtml } from "../types/svg";
import { Property } from "./properties";
abstract class Figure {
  public properties: Record<string, Property> = {};
  refreshProperties(): void {
    Object.keys(this.properties).forEach((key) => {
      const el = this.properties[key];
      this.svgElement.setAttributeNS(null, el.name, el.value);
    });
    const transforms: string[] = [];

    const scaleX = this.properties["scaleX"];
    const scaleY = this.properties["scaleY"];
    if (scaleX || scaleY) {
      transforms.push(` scale(${scaleX.value}, ${scaleY.value})`);
    }

    const rotate = this.properties["rotate"];
    const rotateOrigin = this.properties["transform-origin"];
    this.svgElement.style.transformOrigin = rotateOrigin as any;

    if (rotate && rotateOrigin) {
      transforms.push(`rotate(${rotate.value})`);
    }

    const translateX = this.properties["translateX"];
    const translateY = this.properties["translateY"];
    if (translateX || translateY) {
      transforms.push(`translate(${translateX.value}, ${translateY.value})`);
    }

    this.svgElement.setAttributeNS(null, "transform", transforms.join(" "));
  }
  constructor(public svgElement: SvgInHtml) {}
}

export default Figure;
