import Figure from "./models/figure";
const svgRoot = document.querySelector("#svg-root")!;

export const figuresContainer = {
  figures: [] as Figure[],
  refreshOrder: () => {
    figuresContainer.figures.sort(
      (fig, fig2) =>
        +fig.properties["z-index"].value - +fig2.properties["z-index"].value
    );
    while (svgRoot?.firstChild) {
      svgRoot.firstChild.remove();
    }

    figuresContainer.figures.forEach((fig) => {
      svgRoot.appendChild(fig.svgElement);
    });
  },
  add: (figure: Figure) => {
    figuresContainer.figures.push(figure);
    svgRoot.appendChild(figure.svgElement);
  },
};
