import { SvgInHtml } from "../types/svg";
import Figure from "./figure";

export class Polygon extends Figure {
  constructor(svgEl: SvgInHtml) {
    super(svgEl);
  }
}
