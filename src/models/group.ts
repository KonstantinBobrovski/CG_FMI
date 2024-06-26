import { SvgInHtml } from "../types/svg";
import Figure from "./figure";

class Group extends Figure {
  figures: Figure[];

  constructor(svgEl: SvgInHtml) {
    super(svgEl);
    this.figures = [];
    this.properties = {};
  }

  addFigure(figure: Figure) {
    this.figures.push(figure);
  }

  removeFigure(figure: Figure) {
    const index = this.figures.indexOf(figure);
    if (index !== -1) {
      this.figures.splice(index, 1);
    }
  }
}

export default Group;
