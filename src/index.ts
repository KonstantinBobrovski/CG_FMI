import { BaseFigureFactory } from "./factories/base-figure.factory";
import { CircleFactory } from "./factories/circle.factory";
import { RectangleFactory } from "./factories/rectangle.factory";

import Figure from "./models/figure";
import { NumberProperty, Property, ValueType } from "./models/propertie";
import { SvgInHtml } from "./types/svg";

const figureFactories: BaseFigureFactory<Figure>[] = [
  new CircleFactory(),
  new RectangleFactory(),
];
const svgRoot = document.querySelector("#svg-root")!;
const figuresChooser = document.querySelector("#figures-chooser")!;
const propertiesTab = document.querySelector("#properties-tab")!;
const template = document.querySelector("#input-template")!;

const figureClickHandler = function (figure: Figure) {
  return function (this: SvgInHtml) {
    while (propertiesTab?.firstChild) {
      propertiesTab.firstChild.remove();
    }
    Object.keys(figure.properties).forEach((key) => {
      const property = figure.properties[key];
      console.log({ property });

      let content = template.innerHTML;
      (Object.keys(property) as any as (keyof Property)[]).forEach((key) => {
        content = content.replace(
          new RegExp(`{{${key}}}`, "g"),
          property[key].toString()
        );
        console.log({ key, t: property[key], content });
      });

      const holder = document.createElement("div");
      holder.innerHTML = content;
      const input = holder.querySelector("input")!;
      const inputType = {
        [ValueType.Number]: "number",
        [ValueType.String]: "text",
        [ValueType.Color]: "color",
      };
      input.type = inputType[property.valueType];
      input.placeholder = property.alias;
      input.name = property.name;
      input.value = property.value.toString();
      input.addEventListener("input", () => {
        figure.properties[property.name].value = input.value;
        figure.refreshProperties();
      });
      propertiesTab.appendChild(holder);
    });
  };
};

const bootstrap = () => {
  //svgRoot?.appendChild(figures[0].createFigure().svgElement);

  figureFactories.forEach((figure) => {
    const button = document.createElement("button");
    button.textContent = figure.constructor.name;
    button.addEventListener("click", () => {
      const newFigure = figure.createFigure();
      svgRoot?.appendChild(newFigure.svgElement);
      newFigure.svgElement.addEventListener(
        "click",
        figureClickHandler(newFigure)
      );
    });
    figuresChooser?.appendChild(button);
  });
};

bootstrap();
