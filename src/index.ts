import { BaseFigureFactory } from "./factories/base-figure.factory";
import { CircleFactory } from "./factories/circle.factory";
import { LineFactory } from "./factories/line.factory";
import { RectangleFactory } from "./factories/rectangle.factory";
import { figuresContainer } from "./figures-container";

import Figure from "./models/figure";
import { EnumProperty, Property, ValueType } from "./models/propertie";
import { SvgInHtml } from "./types/svg";

const figureFactories: BaseFigureFactory<Figure>[] = [
  new CircleFactory(),
  new RectangleFactory(),
  new LineFactory(),
];

const figuresChooser = document.querySelector("#figures-chooser")!;
const propertiesTab = document.querySelector("#properties-tab")!;
const template = document.querySelector("#input-template")!;

const inputCreator: (
  prop: Property,
  existing: HTMLInputElement
) => HTMLInputElement = (property: Property, existing: HTMLInputElement) => {
  const inputType = {
    [ValueType.Number]: "number",
    [ValueType.String]: "text",
    [ValueType.Color]: "color",
    [ValueType.Percent]: "number",
    [ValueType.Enums]: "",
  };
  if (inputType[property.valueType]) {
    existing.type = inputType[property.valueType];
  }
  switch (property.valueType) {
    case ValueType.Enums:
      let datalist = document.querySelector("#" + property.name + "-datalist");
      if (!datalist) {
        datalist = document.createElement("datalist");
        datalist.id = property.name + "-datalist";
        (property as EnumProperty).allowedValues.forEach((value) => {
          const option = document.createElement("option");
          option.value = value;
          datalist!.appendChild(option);
        });
        document.body.lastChild!.before(datalist);
      }

      existing.setAttribute("list", property.name + "-datalist");
      break;
    case ValueType.Percent:
      existing.setAttribute("step", "0.01");
    default:
      break;
  }

  existing.placeholder = property.alias;
  existing.name = property.name;
  existing.value = property.value.toString();
  return existing;
};

const figureClickHandler = function (figure: Figure) {
  return function (this: SvgInHtml) {
    while (propertiesTab?.firstChild) {
      propertiesTab.firstChild.remove();
    }
    Object.keys(figure.properties).forEach((key) => {
      const property = figure.properties[key];

      let content = template.innerHTML;
      (Object.keys(property) as any as (keyof Property)[]).forEach((key) => {
        content = content.replace(
          new RegExp(`{{${key}}}`, "g"),
          property[key].toString()
        );
      });

      const holder = document.createElement("div");
      holder.innerHTML = content;
      const input = holder.querySelector("input")!;

      inputCreator(property, input);

      input.addEventListener("input", () => {
        figure.properties[property.name].value = input.value;
        if (property.name === "z-index") {
          figuresContainer.refreshOrder();
        }
        figure.refreshProperties();
      });
      propertiesTab.appendChild(holder);
    });
  };
};

const bootstrap = () => {
  figureFactories.forEach((figure) => {
    const button = document.createElement("button");
    button.textContent = figure.constructor.name;
    button.addEventListener("click", () => {
      const newFigure = figure.createFigure();

      newFigure.svgElement.addEventListener(
        "click",
        figureClickHandler(newFigure)
      );
      figuresContainer.add(newFigure);
    });
    figuresChooser?.appendChild(button);
  });
};

bootstrap();
