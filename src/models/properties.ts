export enum ValueType {
  Number,
  String,
  Color,
  Percent,
  Enums,
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
  constructor(
    name: string,
    value: number,

    alias = name,
    public min: number = 0,
    public max: number = Number.MAX_VALUE
  ) {
    super(name, ValueType.Number);
    this.value = "" + value;
    this.alias = alias;
  }

  validate(value: number): boolean {
    if (value < this.min || value > this.max) {
      return false;
    }
    return true;
  }
}

export class StringProperty extends Property {
  constructor(name: string, value: string, alias = name) {
    super(name, ValueType.String);
    this.value = value;
    this.alias = alias;
  }

  validate(value: string): boolean {
    return typeof value === "string";
  }
}

export class ColorProperty extends Property {
  constructor(name: string, value: string, alias = name) {
    super(name, ValueType.Color);
    this.value = value;
    this.alias = alias;
  }

  validate(value: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(value);
  }
}

export class PercentageProperty extends Property {
  constructor(name: string, value: number, alias = name) {
    super(name, ValueType.Percent);
    this.value = value.toString();
    this.alias = alias;
  }

  validate(value: string): boolean {
    return +value >= 0 && +value <= 1;
  }
}

export class EnumProperty extends Property {
  public allowedValues: string[];

  constructor(
    name: string,
    value: string,
    allowedValues: string[],
    alias = name
  ) {
    super(name, ValueType.Enums);
    this.value = value;
    this.allowedValues = allowedValues;
    this.alias = alias;
  }

  validate(value: string): boolean {
    return this.allowedValues.includes(value);
  }
}
