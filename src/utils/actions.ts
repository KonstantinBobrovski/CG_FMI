import { dragAndDropBootstrap } from "..";
import { CircleFactory } from "../factories/circle.factory";
import { EllipseFactory } from "../factories/ellipse.factory";
import { LineFactory } from "../factories/line.factory";
import { PolygonFactory } from "../factories/polygon.factory";
import { RectangleFactory } from "../factories/rectangle.factory";
import { figuresContainer } from "../figures-container";
import { Circle } from "../models/circle";
import { Ellipse } from "../models/ellipse";
import Figure from "../models/figure";
import { Line } from "../models/line";
import { Polygon } from "../models/polygon";
import { ColorProperty, NumberProperty } from "../models/properties";
import { Rectangle } from "../models/rectangle";
import { closePropPane, createPropPane } from "../ui/create-prop-pane";

export function Copy(selectedFigure: Figure | null): Figure | null {
    let copiedFigure: Figure | null = null;
    if (selectedFigure) {
        let figureFactory = null;

        if (selectedFigure instanceof Circle) {
            figureFactory = new CircleFactory();
        } else if (selectedFigure instanceof Ellipse) {
            figureFactory = new EllipseFactory();
        } else if (selectedFigure instanceof Rectangle) {
            figureFactory = new RectangleFactory();
        } else if (selectedFigure instanceof Line) {
            figureFactory = new LineFactory();
        } else if (selectedFigure instanceof Polygon) {
            figureFactory = new PolygonFactory();
        }

        if (figureFactory) {
            copiedFigure = figureFactory.createFigure();
            copiedFigure.properties["translateX"] = new NumberProperty("translateX", 0, "Translate X");
            copiedFigure.properties["translateY"] = new NumberProperty("translateY", 0, "Translate Y");
            copiedFigure.properties["fill"] = new ColorProperty("fill", selectedFigure.properties["fill"].value);
            copiedFigure.properties["stroke"] = new ColorProperty("stroke", selectedFigure.properties["stroke"].value);

            // add needed properties
            copiedFigure.refreshProperties();
        }
    }
    return copiedFigure;
}

export function Paste(copiedFigure: Figure | null): void {
    if (copiedFigure && !figuresContainer.figures.includes(copiedFigure)) {
        figuresContainer.add(copiedFigure!);
        dragAndDropBootstrap(copiedFigure!);
    } else if(copiedFigure) {
        copiedFigure = Copy(copiedFigure);
        Paste(copiedFigure);
    }
}

export function Delete(selectedFigure: Figure | null): void {
    figuresContainer.figures = figuresContainer.figures.filter((f) => f !== selectedFigure);
    figuresContainer.refreshOrder();
    closePropPane();
}