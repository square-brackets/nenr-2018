import { IFuzzySet } from '../lab1/FuzzySet';
import { Operations } from '../lab1/Operations';

export interface IDefuzzifier {
  defuzzify(conclusions: Array<IFuzzySet>): number;
}

export default class COADefuzzifier implements IDefuzzifier {    
  defuzzify(conclusions: Array<IFuzzySet> = []) {
    const result = conclusions.slice(1).reduce((acc, conclusion) => {
      return Operations.binaryOperation(acc, conclusion, Operations.zadehOr())
    }, conclusions[0]);

    const domain = conclusions[0].getDomain();

    const reduced = domain.getElements().reduce((acc, element) => {
      const value = result.getValueAt(element);
      return {
        a: acc.a + element.getComponentValue(0) * value,
        b: acc.b + value
      }
    }, {a: 0, b: 0});

    return Math.round(reduced.a / reduced.b) || 0;
  }
}
