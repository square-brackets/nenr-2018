export default class DomainElement {
  constructor(private values: Array<number>) {}

  static of(...values: Array<number>) {
    return new DomainElement(values);
  }

  getNumberOfComponents() {
    return this.values.length;
  }

  getComponentValue(index: number) {
    return this.values[index];
  }

  hashCode() {
    return this.values.toString().split('').reduce((val, char, idx) => val + char.charCodeAt(0) * (idx + 5));
  }

  equals(obj: DomainElement) {
    return this.hashCode() === obj.hashCode();
  }

  toString() {
    return this.values.length > 1 ? `(${this.values.join(',')})` : this.values[0].toString();
  }

  inspect() {
    return this.toString();
  }
}
