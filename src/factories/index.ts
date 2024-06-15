import Figure from "../models/figure";
import { BaseFigureFactory } from "./base-figure.factory";
import { CircleFactory } from "./circle.factory";
import { EllipseFactory } from "./ellipse.factory";
import { FifthFactory } from "./fifth.factory";
import { LineFactory } from "./line.factory";
import { PolygonFactory } from "./polygon.factory";
import { RectangleFactory } from "./rectangle.factory";

export const figureFactories: BaseFigureFactory<Figure>[] = [
  new CircleFactory(),
  new RectangleFactory(),
  new LineFactory(),
  new PolygonFactory(),
  new EllipseFactory(),
  new FifthFactory(),
];
