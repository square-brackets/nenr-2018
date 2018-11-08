import { IFuzzySet, MutableFuzzySet } from '../lab1/FuzzySet';
import { IBinaryFunction } from '../lab1/Operations';
import DomainElement from '../lab1/DomainElement';

export class Term {
  constructor(public name: string, public fuzzySet: IFuzzySet) {

  }
}

export class Variable {
  constructor(public name: string, public terms: Term[] = []) {

  }

  getTermByName(name: string) {
    return this.terms.find((term) => term.name === name)
  }
}

export class Rule {
  constructor(public antecedents: Term[], public consequent: Term) {
    
  }

  getConclusion(func: IBinaryFunction, ...values:number[]) {
    const value = this.antecedents.reduce((acc, antecedent, index) => {
      return func.valueAt(acc, antecedent.fuzzySet.getValueAt(DomainElement.of(values[index])));
    }, 1);

    const consequentDomain = this.consequent.fuzzySet.getDomain();
    const result = new MutableFuzzySet(consequentDomain);
    consequentDomain.getElements().forEach((element) => {
      result.set(element, func.valueAt(value, this.consequent.fuzzySet.getValueAt(element)));
    });

    return result;
  }
}