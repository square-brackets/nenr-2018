import { IDomain } from './Domain';
import DomainElement from './DomainElement';

export interface IFuzzySet {
  getDomain(): IDomain,
  getValueAt(DomainElement: DomainElement): number
}

export interface IIntUnaryFunction {
  valueAt(number: number):number
}

export class CalculatedFuzzySet implements IFuzzySet {
  constructor(private domain: IDomain, private func: IIntUnaryFunction) {

  }

  getDomain() {
    return this.domain;
  }

  getValueAt(element: DomainElement) {
    const index = this.domain.indexOfElement(element);
    return this.func.valueAt(index);
  }
}

export class MutableFuzzySet implements IFuzzySet {
  private memberships: Array<number> = [];
  
  constructor(private domain: IDomain) {

  }

  getDomain() {
    return this.domain;
  }

  getValueAt(element: DomainElement) {
    const index = this.domain.indexOfElement(element);
    return this.memberships[index] || 0;
  }

  set(element: DomainElement, value: number) {
    const index = this.domain.indexOfElement(element);
    this.memberships[index] = value;
    return this;
  }
}