import { SvgInHtml } from "../types/svg";
import Figure from "./figure";

export class Ellipse extends Figure {
  constructor(svgEl: SvgInHtml) {
    super(svgEl);
  }
}
