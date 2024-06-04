import Figure from "../models/figure";
import {
  ColorProperty,
  EnumProperty,
  NameProperty,
  NumberProperty,
  PercentageProperty,
  Property,
} from "../models/properties";

let elementsCreated = 0;
export const onCreateElement = () => {
  return elementsCreated++;
};
export abstract class BaseFigureFactory<T extends Figure> {
  public static svgNS: string = "http://www.w3.org/2000/svg" as const;
  private static figureCounters: { [key: string]: number } = {};

  abstract createFigure(): T;

  static getBaseProperties(figureType: string): Record<string, Property> {
    return [
      new NameProperty("name", `${figureType}-${BaseFigureFactory.getFigureNumber(figureType)}`),
      new PercentageProperty("opacity", 1),
      new NumberProperty("rotate", 0),
      new EnumProperty(
        "transform-origin",
        "center",
        ["center", "top", "bottom", "left", "right"],
        "rotate-point"
      ),
      new NumberProperty("z-index", onCreateElement(), "z-index"),
      new NumberProperty("scaleX", 1, "Scale X"),
      new NumberProperty("scaleY", 1, "Scale Y"),
      new NumberProperty("translateX", 0, "Translate X"),
      new NumberProperty("translateY", 0, "Translate Y"),
      new ColorProperty("fill", "black"),
      new ColorProperty("stroke", "black"),

    ].reduce((prev, curr) => ({ ...prev, [curr.name]: { ...curr } }), {});
  }

  private static getFigureNumber(figureType: string): number {
    if (!BaseFigureFactory.figureCounters[figureType]) {
      BaseFigureFactory.figureCounters[figureType] = 1;
    } else {
      BaseFigureFactory.figureCounters[figureType]++;
    }
    return BaseFigureFactory.figureCounters[figureType];
  }
  
  abstract getProperties(): Record<string, Property>;
}
