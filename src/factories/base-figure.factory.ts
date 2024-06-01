import Figure from "../models/figure";
import {
  EnumProperty,
  NumberProperty,
  PercentageProperty,
  Property,
} from "../models/propertie";

let elementsCreated = 0;
export const onCreateElement = () => {
  return elementsCreated++;
};
export abstract class BaseFigureFactory<T extends Figure> {
  public static svgNS: string = "http://www.w3.org/2000/svg" as const;
  abstract createFigure(): T;

  static getBaseProperties(): Record<string, Property> {
    return [
      new PercentageProperty("opacity", 1),
      new NumberProperty("rotate", 0),
      new EnumProperty(
        "transform-origin",
        "center",
        ["center", "top", "bottom", "left", "right"],
        "rotate-point"
      ),
      new NumberProperty("z-index", onCreateElement(), "z-index"),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: { ...curr } }), {});
  }
  abstract getProperties(): Record<string, Property>;
}
