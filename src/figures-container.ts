import { BaseFigureFactory } from "./factories/base-figure.factory";
import { GroupFactory } from "./factories/group.factory";
import Figure from "./models/figure";
import Group from "./models/group";
import { closePropPane, createGroupPropPane, createPropPane } from "./ui/create-prop-pane";
const svgRoot = document.querySelector("#svg-root")!;
const treemap = document.querySelector("#treemap-figures")!;
const createGroupButton = document.querySelector("#create-group-button")!;

export const figuresContainer = {
  figures: [] as Figure[],
  groups: [] as Group[],
  refreshOrder() {
    figuresContainer.figures.sort(
      (fig, fig2) =>
        +fig.properties["z-index"].value - +fig2.properties["z-index"].value
    );
    while (svgRoot?.firstChild) {
      svgRoot.firstChild.remove();
    }
    while (treemap?.firstChild) {
      treemap.firstChild.remove();
    }
    this.refreshTree();
  },
  refreshTree() {
    while (treemap?.firstChild) {
      treemap.firstChild.remove();
    }

    figuresContainer.groups.forEach((group) => {
      const groupNameli = document.createElement("li");
      treemap.appendChild(groupNameli);
      const nameWrapper = document.createElement("span");
      nameWrapper.textContent = `Group: ${group.properties['groupName'].value}`;
      groupNameli.appendChild(nameWrapper);

      const g = document.createElementNS(BaseFigureFactory.svgNS, "g");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        const index = figuresContainer.groups.indexOf(group);
        if (index !== -1) {
          figuresContainer.groups.splice(index, 1);
          groupNameli.remove();
          group.figures.forEach((fig) => {
            fig.svgElement.remove();
          });
          this.refreshOrder();
        }
      });
      groupNameli.appendChild(deleteButton);

      const ul = document.createElement('ul');
      group.figures.forEach((fig) => {
        const li = document.createElement("li");
        ul.appendChild(li);
        const nameWrapper = document.createElement("span");
        nameWrapper.textContent = fig.properties["name"].value;
        li.appendChild(nameWrapper);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
          group.figures = group.figures.filter(
            (f) => f !== fig
          );
          li.remove();
          fig.svgElement.remove();
          this.refreshOrder();
        });
        li.appendChild(deleteButton);

        const removeFromGroup = document.createElement("button");
        removeFromGroup.textContent = "-";
        removeFromGroup.classList.add("remove-from-group-button");
        removeFromGroup.addEventListener("click", () => {
          group.removeFigure(fig);
          li.remove();
          fig.svgElement.remove();
          figuresContainer.add(fig);
          this.refreshOrder();
        });
        li.appendChild(removeFromGroup);

        li.addEventListener("click", (e) => {
          if (e.target === deleteButton || e.target === removeFromGroup) {
            closePropPane();
          } else {
            createPropPane(fig)
          }
        });
        groupNameli.appendChild(ul);
        g.appendChild(fig.svgElement);
      });

      groupNameli.addEventListener("click", (e) => {
        if (e.target !== deleteButton) {
          createGroupPropPane(group);
        } else {
          closePropPane();
        }
      });

      svgRoot.appendChild(g);
    });

    figuresContainer.figures.forEach((fig) => {
      const li = document.createElement("li");

      treemap.appendChild(li);
      const nameWrapper = document.createElement("span");
      nameWrapper.textContent = fig.properties["name"].value;
      li.appendChild(nameWrapper);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "X";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", () => {
        figuresContainer.figures = figuresContainer.figures.filter(
          (f) => f !== fig
        );
        li.remove();
        fig.svgElement.remove();
        this.refreshOrder();
      });
      li.appendChild(deleteButton);

      const addToGroup = document.createElement("button");
      addToGroup.textContent = "+";
      addToGroup.classList.add("add-to-group-button");
      addToGroup.addEventListener("click", () => {
        const groupName = prompt('Select the group name:');
        if (groupName) {
          const group = figuresContainer.groups.find(group => group.name === groupName);
          if (group) {
            group.addFigure(fig);
            figuresContainer.figures = figuresContainer.figures.filter(
              (f) => f !== fig
            );
            li.remove();
            this.refreshOrder();
          } else {
            alert('Group "' + groupName + '" not found!');
          }
        }
        this.refreshOrder();
      });
      li.appendChild(addToGroup);

      li.addEventListener("click", (e) => {
        if (e.target === deleteButton || e.target === addToGroup) {
          closePropPane();
        } else {
          createPropPane(fig)
        }
      });
      svgRoot.appendChild(fig.svgElement);
    });
  },
  add(figure: Figure) {
    figuresContainer.figures.push(figure);
    svgRoot.appendChild(figure.svgElement);
    createPropPane(figure);
    this.refreshOrder();
  },
  addGroup(groupName: string) {
    if (figuresContainer.groups.find(group => group.name === groupName)) {
      alert('Group "' + groupName + '" already exists');
    } else {
      const group = GroupFactory.createGroup(groupName);
      figuresContainer.groups.push(group);
      this.refreshOrder();
    }
  },
};

createGroupButton.addEventListener('click', () => {
  const groupName = prompt('Enter the group name:');
  if (groupName) {
    figuresContainer.addGroup(groupName);
  }
});
