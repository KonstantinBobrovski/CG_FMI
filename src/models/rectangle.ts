import { SvgInHtml } from "../types/svg";
import Figure from "./figure";

export class Rectangle extends Figure {
  constructor(svgEl: SvgInHtml) {
    super(svgEl);
  }
}
