export enum ValueType {
  Number,
  String,
  Color,
}

export abstract class Property {
  name: string;
  valueType: ValueType;
  value: string = "";
  alias: string;

  constructor(name: string, valueType: ValueType) {
    this.name = name;
    this.valueType = valueType;
    this.alias = name;
  }

  abstract validate(value: number | string): boolean;
}

export class NumberProperty extends Property {
  constructor(name: string, value: number) {
    super(name, ValueType.Number);
    this.value = "" + value;
  }

  validate(value: number): boolean {
    return typeof value === "number";
  }
}

export class StringProperty extends Property {
  constructor(name: string, value: string) {
    super(name, ValueType.String);
    this.value = value;
  }

  validate(value: string): boolean {
    return typeof value === "string";
  }
}

export class ColorProperty extends Property {
  constructor(name: string, value: string) {
    super(name, ValueType.Color);
    this.value = value;
  }

  validate(value: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(value);
  }
}
