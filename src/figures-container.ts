import { BaseFigureFactory } from "./factories/base-figure.factory";
import { GroupFactory } from "./factories/group.factory";
import Figure from "./models/figure";
import Group from "./models/group";
import { NameProperty, Property } from "./models/properties";
import { SvgInHtml } from "./types/svg";
import { Copy } from "./ui/actions";
import {
  closePropPane,
  createGroupPropPane,
  createPropPane,
} from "./ui/create-prop-pane";
import { dragAndDropBootstrap } from "./ui/drag-and-drop";
const svgRoot = document.querySelector<HTMLElement>("#svg-root")!;
const treemap = document.querySelector<HTMLElement>("#treemap-figures")!;
const createGroupButton = document.querySelector("#create-group-button")!;
const clearCanvasButton = document.querySelector("#clear-canvas-button")!;

export const figuresContainer = {
  figures: [] as Figure[],
  groups: [] as Group[],
  refreshOrder() {
    this.figures.sort(
      (fig1, fig2) =>
        +fig1.properties["z-index"].value - +fig2.properties["z-index"].value
    );
    this.groups.sort(
      (group1, group2) =>
        +group1.properties["z-index"].value -
        +group2.properties["z-index"].value
    );
    this.clearElement(svgRoot);
    this.clearElement(treemap);
    this.refreshTree();
  },
  refreshTree() {
    this.clearElement(treemap);

    this.groups.forEach((group) => this.createGroupTreeElement(group));
    this.figures.forEach((fig) => this.createFigureTreeElement(fig));
  },
  add(figure: Figure) {
    figuresContainer.figures.push(figure);
    svgRoot.appendChild(figure.svgElement);
    createPropPane(figure);
    this.refreshOrder();
  },
  addGroup(groupName: string | Group) {
    if (
      figuresContainer.groups.find(
        (group) => group.properties["groupName"].value === groupName
      )
    ) {
      alert('Group "' + groupName + '" already exists');
      return figuresContainer.groups.find(
        (group) => group.properties["groupName"].value === groupName
      )!;
    } else if (groupName instanceof Group) {
      this.groups.push(groupName);
      dragAndDropBootstrap(groupName);
      this.refreshOrder();
      return groupName;
    }
    const groupFactory = new GroupFactory();
    const group = groupFactory.createFigure(groupName);
    this.groups.push(group);
    dragAndDropBootstrap(group);
    this.refreshOrder();
    return group;
  },
  clearElement(element: HTMLElement) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  },
  createGroupTreeElement(group: Group) {
    const groupElement = document.createElement("li");
    const nameWrapper = this.createElement(
      "span",
      `Group: ${group.properties["groupName"].value}`
    );
    const deleteButton = this.createButton("X", "delete-button", () =>
      this.deleteGroup(group, groupElement)
    );
    const copyButton = this.createButton("Copy", "copy-button", () =>
      this.copyGroup(group)
    );
    const ul = document.createElement("ul");

    group.figures.forEach((fig) =>
      ul.appendChild(this.createFigureInGroupTreeElement(fig, group))
    );

    groupElement.appendChild(nameWrapper);
    groupElement.appendChild(deleteButton);
    groupElement.appendChild(copyButton);
    groupElement.appendChild(ul);

    groupElement.addEventListener("click", (e) => {
      const clickedFigure = group.figures.find(
        (fig) =>
          fig.properties["name"].value === (e.target as HTMLElement).textContent
      );

      if (
        e.target !== deleteButton &&
        (e.target as HTMLElement) === nameWrapper
      ) {
        createGroupPropPane(group);
      } else if (clickedFigure) {
        createPropPane(clickedFigure);
      } else {
        closePropPane();
      }
    });

    treemap.appendChild(groupElement);

    const g =
      group.svgElement ||
      document.createElementNS(BaseFigureFactory.svgNS, "g");
    group.figures.forEach((fig) => g.appendChild(fig.svgElement));
    svgRoot.appendChild(g);
    group.svgElement = g as SvgInHtml;
    dragAndDropBootstrap(group);
  },
  createFigureTreeElement(fig: Figure) {
    const figureElement = document.createElement("li");
    const nameWrapper = this.createElement(
      "span",
      fig.properties["name"].value
    );
    const deleteButton = this.createButton("X", "delete-button", () =>
      this.deleteFigure(fig, figureElement)
    );
    const addToGroupButton = this.createButton("+", "add-to-group-button", () =>
      this.addFigureToGroup(fig, figureElement)
    );

    figureElement.appendChild(nameWrapper);
    figureElement.appendChild(deleteButton);
    figureElement.appendChild(addToGroupButton);

    figureElement.addEventListener("click", (e) => {
      if (e.target === deleteButton || e.target === addToGroupButton) {
        closePropPane();
      } else {
        createPropPane(fig);
      }
    });

    treemap.appendChild(figureElement);
    svgRoot.appendChild(fig.svgElement);
  },
  createFigureInGroupTreeElement(fig: Figure, group: Group) {
    const figureElement = document.createElement("li");
    const nameWrapper = this.createElement(
      "span",
      fig.properties["name"].value
    );
    const deleteButton = this.createButton("X", "delete-button", () =>
      this.deleteFigureFromGroup(fig, group, figureElement)
    );
    const removeFromGroupButton = this.createButton(
      "-",
      "remove-from-group-button",
      () => this.removeFigureFromGroup(fig, group, figureElement)
    );

    figureElement.appendChild(nameWrapper);
    figureElement.appendChild(deleteButton);
    figureElement.appendChild(removeFromGroupButton);

    figureElement.addEventListener("click", (e) => {
      if (e.target === deleteButton || e.target === removeFromGroupButton) {
        closePropPane();
      } else {
        createPropPane(fig);
      }
    });

    return figureElement;
  },
  createElement(tag: string, textContent: string): HTMLElement {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
  },

  createButton(
    text: string,
    className: string,
    onClick: () => void
  ): HTMLButtonElement {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener("click", onClick);
    return button;
  },

  copyGroup(group: Group) {
    const groupFactory = new GroupFactory();
    const copiedGroup = groupFactory.createFigure(
      group.properties["groupName"].value + "-copy"
    );
    group.figures.forEach((figure) => {
      const copiedFigure = Copy(figure);
      if (copiedFigure) {
        dragAndDropBootstrap(copiedFigure!);
        copiedGroup.figures.push(copiedFigure);
      }
    });

    copiedGroup!.properties = {};
    Object.keys(group.properties).map((key) => {
      const property = {
        ...group!.properties[key],
      };
      const withProto = Object.setPrototypeOf(
        property,
        Object.getPrototypeOf(group!.properties[key])
      ) as Property;
      copiedGroup!.properties[key] = withProto;
    });
    copiedGroup!.properties["groupName"] = new NameProperty(
      "groupName",
      `${copiedGroup.properties["groupName"].value}-copy`
    );

    copiedGroup.refreshProperties();
    this.refreshOrder();
    this.addGroup(copiedGroup);
  },

  deleteFigure(fig: Figure, figureElement: HTMLElement) {
    this.figures = this.figures.filter((f) => f !== fig);
    figureElement.remove();
    fig.svgElement.remove();
    this.refreshOrder();
  },

  deleteGroup(group: Group, groupElement: HTMLElement) {
    this.groups = this.groups.filter((g) => g !== group);
    groupElement.remove();
    group.figures.forEach((fig) => fig.svgElement.remove());
    this.refreshOrder();
  },

  deleteFigureFromGroup(fig: Figure, group: Group, figureElement: HTMLElement) {
    group.figures = group.figures.filter((f) => f !== fig);
    figureElement.remove();
    fig.svgElement.remove();
    this.refreshOrder();
  },

  removeFigureFromGroup(fig: Figure, group: Group, figureElement: HTMLElement) {
    group.removeFigure(fig);
    figureElement.remove();
    this.add(fig);
    this.refreshOrder();
  },

  addFigureToGroup(fig: Figure, figureElement: HTMLElement) {
    const groupName = prompt("Select the group name:");
    let group = this.groups.find(
      (group) => group.properties["groupName"].value === groupName
    );
    if (!groupName) {
      return;
    }
    if (!group) {
      figuresContainer.addGroup(groupName);
      group = this.groups.find(
        (group) => group.properties["groupName"].value === groupName
      );
    }
    fig.svgElement.addEventListener("click", () => {
      if (group) {
        createGroupPropPane(group);
      } else {
        createPropPane(fig);
      }
    });

    fig.svgElement.addEventListener("dblclick", () => {
      if (group) {
        createPropPane(fig);
      }
    });

    group!.addFigure(fig);
    this.figures = this.figures.filter((f) => f !== fig);
    figureElement.remove();
    this.refreshOrder();
  },
};

createGroupButton.addEventListener("click", () => {
  const groupName = prompt("Enter the group name:");
  if (groupName) {
    figuresContainer.addGroup(groupName);
  }
});

clearCanvasButton.addEventListener("click", () => {
  figuresContainer.figures = [];
  figuresContainer.groups = [];
  figuresContainer.refreshOrder();
  closePropPane();
});
