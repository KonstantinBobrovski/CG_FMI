import { SvgInHtml } from "../types/svg";
import Figure from "./figure";

export class Line extends Figure {
  constructor(svgEl: SvgInHtml) {
    super(svgEl);
  }
}
