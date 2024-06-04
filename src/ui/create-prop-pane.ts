import { figuresContainer } from "../figures-container";
import Figure from "../models/figure";
import { EnumProperty, ValueType } from "../models/properties";

const propertiesTab = document.querySelector("#properties-tab")!;

export const createPropPane = (figure: Figure) => {
  while (propertiesTab?.firstChild) {
    propertiesTab.firstChild.remove();
  }
  Object.keys(figure.properties).forEach((key) => {
    const property = figure.properties[key];

    const wrapper = document.createElement("div");
    wrapper.classList.add("form-group");
    const label = document.createElement("label");
    label.textContent = property.alias;
    label.htmlFor = property.name;
    wrapper.appendChild(label);
    propertiesTab.appendChild(wrapper);
    let inputElement = document.createElement("input") as HTMLElement & {
      value: string;
      type: string;
    };

    const inputTypeMap = {
      [ValueType.Number]: "number",
      [ValueType.String]: "text",
      [ValueType.Color]: "color",
      [ValueType.Percent]: "number",
      [ValueType.Enums]: "",
    };
    switch (property.valueType) {
      case ValueType.Enums:
        inputElement = document.createElement("select");
        (property as EnumProperty).allowedValues.forEach((value) => {
          const option = document.createElement("option");
          option.value = value;
          option.text = value;
          inputElement.appendChild(option);
        });
        inputElement.value = (property as EnumProperty).value;
        break;
      case ValueType.Percent:
        (inputElement as any).step = 0.01;
        inputElement.type = inputTypeMap[property.valueType];
        inputElement.value = property.value;
        break;
      default:
        inputElement.type = inputTypeMap[property.valueType];
        inputElement.value = property.value;
    }
    wrapper.appendChild(inputElement);
    inputElement.addEventListener("input", () => {
      figure.properties[property.name].value = inputElement.value;
      if (property.name === "z-index") {
        figuresContainer.refreshOrder();
      }
      figure.refreshProperties();
    });
    propertiesTab.appendChild(wrapper);
  });
};

export const closePropPane = () => {
  propertiesTab.innerHTML = "";
}
