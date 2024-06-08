import Group from "../models/group";
import {
  ColorProperty,
  NameProperty,
  NumberProperty,
  PercentageProperty,
  Property,
} from "../models/properties";

export class GroupFactory {
  static createGroup(name: string): Group {
    const group = new Group();
    group.properties = this.getBaseProperties(name);
    return group;
  }

  private static getBaseProperties(groupName: string): Record<string, Property> {
    return [
      new NameProperty("groupName", groupName),
      new ColorProperty("fill", "#000000", "Group Color"),
      new PercentageProperty("opacity", 1, "Group Opacity"),
      new NumberProperty("z-index", 1, "z-index"),
    ].reduce((prev, curr) => ({ ...prev, [curr.name]: { ...curr } }), {});;
  }
}

