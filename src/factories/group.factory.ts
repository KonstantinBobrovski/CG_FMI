import Group from "../models/group";
import {
  NameProperty,
  Property,
} from "../models/properties";
import { SvgInHtml } from "../types/svg";
import { BaseFigureFactory } from "./base-figure.factory";

export class GroupFactory extends BaseFigureFactory<Group> {
  createFigure(groupName: string): Group {
    const element = document.createElementNS(
      BaseFigureFactory.svgNS,
      "g"
    ) as SvgInHtml;
    const group = new Group(element);
    group.properties = this.getProperties(groupName);
    group.refreshProperties();
    return group;
  }
  getProperties(groupName: string): Record<string, Property> {
    const currentProps = [
      new NameProperty("groupName", groupName),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: curr }), {});

    return {
      ...currentProps,
      ...Object.fromEntries(
        Object.entries(BaseFigureFactory.getBaseProperties("line")).filter(
          ([key]) => key !== "name" && key !== 'fill' && key !== 'stroke'
        )
      ),
    }
  }
}

