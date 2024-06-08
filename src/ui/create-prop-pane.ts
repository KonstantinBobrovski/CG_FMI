import { figuresContainer } from "../figures-container";
import Figure from "../models/figure";
import Group from "../models/group";
import { EnumProperty, ValueType } from "../models/properties";

const propertiesTab = document.querySelector("#properties-tab")!;

const generatePropPane = (entity: Figure | Group) => {
  while (propertiesTab?.firstChild) {
    propertiesTab.firstChild.remove();
  }
  Object.keys(entity.properties).forEach((key) => {
    const property = entity.properties[key];
    const wrapper = document.createElement("div");
    wrapper.classList.add("form-group");
    const label = document.createElement("label");
    label.textContent = property.alias;
    label.htmlFor = property.name;
    wrapper.appendChild(label);
    propertiesTab.appendChild(wrapper);
    let inputElement = document.createElement("input") as
      | HTMLInputElement
      | HTMLSelectElement;

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
        (inputElement as HTMLInputElement).step = "0.01";
        (inputElement as HTMLInputElement).type =
          inputTypeMap[property.valueType];
        inputElement.value = property.value;

        break;
      default:
        (inputElement as HTMLInputElement).type =
          inputTypeMap[property.valueType];
        inputElement.value = property.value;
    }
    wrapper.appendChild(inputElement);
    let prevValue = property.value;

    inputElement.addEventListener("input", (e) => {
      if (!property.validate(inputElement.value)) {
        e.preventDefault();
        inputElement.value = prevValue;
        return;
      }
      prevValue = inputElement.value;
      entity.properties[property.name].value = inputElement.value;
      if (property.name === "z-index") {
        figuresContainer.refreshOrder();
      }
      if (property.name === "name" || property.name === "groupName") {
        figuresContainer.refreshTree();
      }
      entity.refreshProperties();
    });
    propertiesTab.appendChild(wrapper);
  });
}

export const createPropPane = (figure: Figure) => {
  generatePropPane(figure);
};

export const closePropPane = () => {
  propertiesTab.innerHTML = "";
};

export const createGroupPropPane = (group: Group) => {
  generatePropPane(group);
};
