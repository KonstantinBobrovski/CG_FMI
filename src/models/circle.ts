import { SvgInHtml } from "../types/svg";
import Figure from "./figure";

export class Circle extends Figure {
  constructor(svgEl: SvgInHtml) {
    super(svgEl);
  }
}
