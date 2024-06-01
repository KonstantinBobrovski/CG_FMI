import { SvgInHtml } from "../types/svg";
import Figure from "./figure";

export class Rectangle extends Figure {
  constructor(svgEl: SvgInHtml) {
    super(svgEl);
  }

  refreshProperties(): void {
    super.refreshProperties();
    const rotate = this.properties["rotate"];
    const rotateOrigin = this.properties["transform-origin"];
    this.svgElement.style.transformOrigin = rotateOrigin as any;
    this.svgElement.setAttributeNS(
      null,
      "transform",
      `rotate(${rotate.value})`
    );
  }
}
