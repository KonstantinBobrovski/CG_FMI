import Figure from "../models/figure";
import { SvgInHtml } from "../types/svg";

const svgRoot: SvgInHtml = document.querySelector("#svg-root")!;

export function changeToSvgCoordinates(
  mouseX: number,
  mouseY: number,
  newFigure: Figure
) {
  const ctm = svgRoot.getScreenCTM()!.inverse();
  const point = new DOMPoint(mouseX, mouseY);
  const transformedPoint = point.matrixTransform(ctm);
  newFigure.properties["translateX"].value = transformedPoint.x.toString();
  newFigure.properties["translateY"].value = transformedPoint.y.toString();
  if (newFigure.properties["cx"]) {
    newFigure.properties["cx"].value = "0";
    newFigure.properties["cy"].value = "0";
  }

  if (newFigure.properties["x"]) {
    newFigure.properties["x"].value = "0";
    newFigure.properties["y"].value = "0";
  }

  if (newFigure.properties["points"]) {
    newFigure.properties["translateX"].value = (
      +newFigure.properties["translateX"].value - 50
    ).toString();
    newFigure.properties["translateY"].value = (
      +newFigure.properties["translateY"].value - 30
    ).toString();
  }
}
