import Figure from "../models/figure";
import { Property } from "../models/propertie";

export abstract class BaseFigureFactory<T extends Figure> {
  public static svgNS: string = "http://www.w3.org/2000/svg" as const;
  abstract createFigure(): T;
  abstract getProperties(): Record<string, Property>;
}
