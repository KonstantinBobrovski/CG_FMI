import Figure from "../models/figure";

let _copiedFigure: Figure | null = null;

export function getCopiedFigure(): Figure | null {
  return _copiedFigure;
}
export function setCopiedFigure(figure: Figure | null) {
  _copiedFigure = figure;
}
