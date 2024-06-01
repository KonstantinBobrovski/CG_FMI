import { SvgInHtml } from "../types/svg";
import Figure from "./figure";
import { Property, NumberProperty } from "./propertie";

export class Circle extends Figure {
  constructor(svgEl: SvgInHtml) {
    super(svgEl);
  }
}
