import { SvgInHtml } from "../types/svg";
import Figure from "./figure";

export class Fancy extends Figure {
  constructor(svgEl: SvgInHtml) {
    super(svgEl);
  }
}
