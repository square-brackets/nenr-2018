import DomainElement from './DomainElement';

export interface IDomain extends Iterable<DomainElement> {
  getCardinality(): number,
  getComponent(number: number): SimpleDomain,
  getNumberOfComponents(): number,
  indexOfElement(DomainElement: DomainElement): number,
  elementForIndex(number: number): DomainElement,
  getElements(): Array<DomainElement>
};

export default abstract class Domain implements IDomain {
  static intRange(start: number, end: number) {
    return new SimpleDomain(start, end);
  }

  static combine(d1: IDomain, d2: IDomain) {
    const d1Domains = Array.from({length: d1.getNumberOfComponents()}).map((_, i) => d1.getComponent(i));
    const d2Domains = Array.from({length: d2.getNumberOfComponents()}).map((_, i) => d2.getComponent(i));
    return new CompositeDomain([...d1Domains, ...d2Domains]);
  }

  indexOfElement(element: DomainElement) {
    return this.getElements().findIndex((el) => el.equals(element));
  }

  elementForIndex(index: number) {
    return this.getElements()[index];
  }

  abstract getNumberOfComponents()
  abstract getComponent(number)
  abstract getCardinality()
  abstract getElements(): Array<DomainElement>
  abstract [Symbol.iterator](): Iterator<DomainElement>
}

export class CompositeDomain extends Domain {
  constructor(private components: Array<SimpleDomain>) {
    super();
  }

  getCardinality() {
    return this.components.reduce((acc, component) => acc * component.getCardinality(), 1);
  }

  getComponent(index) {
    return this.components[index];
  }

  getNumberOfComponents() {
    return this.components.length;
  }

  getElements() {
    return this.getIterator();
  }

  [Symbol.iterator]() {
    return this.getIterator()[Symbol.iterator]();
  }

  private getIterator() {
    const simpleCartesian = (a, b) => [].concat(...a.map((aa) => b.map((bb) => [].concat(aa, bb))));
    const cartesianProduct = (a?, b?, ...c) => a ? (b ? cartesianProduct(simpleCartesian(a, b), ...c) : a) : [];

    return cartesianProduct(...this.components.map((component) => component.getElements())).map((els) => {
      return DomainElement.of(...els.map((el) => el.getComponentValue(0)));
    });
  }
}

export class SimpleDomain extends Domain {
  constructor(private first: number, private last: number) {
    super();

    if (this.first > this.last) {
      throw new Error('First element must be less than last elment');
    }
  }

  getCardinality() {
    return this.last - this.first;
  }

  getComponent(number) {
    return this;
  }

  getNumberOfComponents() {
    return 1;
  }

  getFirst() {
    return this.first;
  }

  getLast() {
    return this.last;
  }

  getElements() {
    return this.getIterator();
  }

  [Symbol.iterator]() {
    return this.getIterator()[Symbol.iterator]();
  }

  private getIterator() {
    return Array.from({length: this.getCardinality()}).map((_, i) => DomainElement.of(this.first + i));
  }
}

