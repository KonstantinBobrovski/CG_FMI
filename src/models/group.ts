import Figure from "./figure";
import { Property } from "./properties";

class Group {
    name: string;
    figures: Figure[];
    properties: Record<string, Property>;

    constructor(name: string) {
        this.name = name;
        this.figures = [];
        this.properties = {};
    }

    addFigure(figure: Figure) {
        this.figures.push(figure);
    }

    removeFigure(figure: Figure) {
        const index = this.figures.indexOf(figure);
        if (index !== -1) {
            this.figures.splice(index, 1);
        }
    }

    refreshProperties() {
        this.figures.forEach((figure) => {
            Object.keys(this.properties).forEach((key) => {
                if(key === "groupName") return;
                figure.properties[key].value = this.properties[key].value;
            });
            figure.refreshProperties();
        });
    }
}

export default Group;