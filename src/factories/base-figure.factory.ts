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
const figureCounters: { [key: string]: number } = {};
export const onCreateElement = () => {
  return elementsCreated++;
};
export abstract class BaseFigureFactory<T extends Figure> {
  public static svgNS: string = "http://www.w3.org/2000/svg" as const;

  abstract createFigure(name?: string): T;

  static getBaseProperties(figureType: string): Record<string, Property> {
    const getFigureNumber = (figureType: string): number => {
      if (!figureCounters[figureType]) {
        figureCounters[figureType] = 1;
      } else {
        figureCounters[figureType]++;
      }
      return figureCounters[figureType];
    };

    return [
      new NameProperty("name", `${figureType}-${getFigureNumber(figureType)}`),
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
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: curr }), {});
  }

  abstract getProperties(name?: string): Record<string, Property>;
}
