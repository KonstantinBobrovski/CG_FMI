import Figure from "./models/figure";
import { createPropPane } from "./ui/create-prop-pane";
const svgRoot = document.querySelector("#svg-root")!;
const treemap = document.querySelector("#treemap-figures")!;
export const figuresContainer = {
  figures: [] as Figure[],
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

    figuresContainer.figures.forEach((fig) => {
      const li = document.createElement("li");

      treemap.appendChild(li);
      const nameWrapper = document.createElement("span");
      //TODO: Add here name when implemented
      nameWrapper.textContent = fig.constructor.name;
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

      li.addEventListener("click", () => createPropPane(fig));
      svgRoot.appendChild(fig.svgElement);
    });
  },
  add(figure: Figure) {
    figuresContainer.figures.push(figure);
    svgRoot.appendChild(figure.svgElement);
    this.refreshOrder();
  },
};
