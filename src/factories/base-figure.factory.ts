import Figure from "../models/figure";
import { Property } from "../models/propertie";

let elementsCreated = 0;
export const onCreateElement = () => {
  return elementsCreated++;
};
export abstract class BaseFigureFactory<T extends Figure> {
  public static svgNS: string = "http://www.w3.org/2000/svg" as const;
  abstract createFigure(): T;
  abstract getProperties(): Record<string, Property>;
}
