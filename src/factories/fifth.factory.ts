import { Fifth } from "../models/fifth";
import { Line } from "../models/line";
import { Property, NumberProperty } from "../models/properties";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory, onCreateElement } from "./base-figure.factory";

export class FifthFactory extends BaseFigureFactory<Fifth> {
  constructor() {
    super();
  }

  createFigure(): Fifth {
    const element = document.createElementNS(
      BaseFigureFactory.svgNS,
      "g"
    ) as SvgInHtml;
    const circle = document.createElementNS(
      BaseFigureFactory.svgNS,
      "circle"
    ) as SvgInHtml;
    const vertLine = document.createElementNS(
      BaseFigureFactory.svgNS,
      "line"
    ) as SvgInHtml;
    const horLine1 = document.createElementNS(
      BaseFigureFactory.svgNS,
      "line"
    ) as SvgInHtml;
    const horLine2 = document.createElementNS(
      BaseFigureFactory.svgNS,
      "line"
    ) as SvgInHtml;
    const horLine3 = document.createElementNS(
      BaseFigureFactory.svgNS,
      "line"
    ) as SvgInHtml;
    element.appendChild(circle);
    element.appendChild(vertLine);
    element.appendChild(horLine1);
    element.appendChild(horLine2);
    element.appendChild(horLine3);

    circle.setAttributeNS(null, "fill", "white");

    circle.setAttributeNS(null, "r", "10");
    circle.setAttributeNS(null, "cx", "20");
    circle.setAttributeNS(null, "cy", "20");

    vertLine.setAttributeNS(null, "x1", "20");
    vertLine.setAttributeNS(null, "y1", "10");
    vertLine.setAttributeNS(null, "x2", "20");
    vertLine.setAttributeNS(null, "y2", "30");

    horLine1.setAttributeNS(null, "x1", "12");
    horLine1.setAttributeNS(null, "y1", "14.55");
    horLine1.setAttributeNS(null, "x2", "28");
    horLine1.setAttributeNS(null, "y2", "14.55");

    horLine3.setAttributeNS(null, "x1", "12");
    horLine3.setAttributeNS(null, "y1", "25.55");
    horLine3.setAttributeNS(null, "x2", "28");
    horLine3.setAttributeNS(null, "y2", "25.55");

    horLine2.setAttributeNS(null, "x1", "10");
    horLine2.setAttributeNS(null, "y1", "20");
    horLine2.setAttributeNS(null, "x2", "30");
    horLine2.setAttributeNS(null, "y2", "20");

    const fi = new Fifth(element);
    fi.properties = this.getProperties();
    fi.refreshProperties();
    return fi;
  }

  getProperties(): Record<string, Property> {
    return {
      ...Object.fromEntries(
        Object.entries(BaseFigureFactory.getBaseProperties("line")).filter(
          ([key]) => key !== "fill"
        )
      ),
    };
  }
}
