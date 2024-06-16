import Figure from "../models/figure";
import { createPropPane } from "./create-prop-pane";

let _selectedFigure: Figure | null = null;

export function getSelectedFigure(): Figure | null {
  return _selectedFigure;
}
export function setSelectedFigure(figure: Figure | null) {
  _selectedFigure = figure;
  if (figure) createPropPane(figure);
}
