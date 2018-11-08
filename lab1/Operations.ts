import { IFuzzySet, MutableFuzzySet } from './FuzzySet';

export interface IBinaryFunction {
  valueAt(a: number, b: number): number
}

export interface IUnaryFunction {
  valueAt(a: number): number
}

export class Operations {
  static unaryOperation(set: IFuzzySet, func: IUnaryFunction): IFuzzySet {
    const domain = set.getDomain();
    const newSet = new MutableFuzzySet(domain);
    
    for (let e of domain) {
      newSet.set(e, func.valueAt(set.getValueAt(e)));
    }

    return newSet;
  }

  static binaryOperation(setA: IFuzzySet, setB: IFuzzySet, func: IBinaryFunction): IFuzzySet {
    const domain = setA.getDomain();
    const newSet = new MutableFuzzySet(domain);
    
    for (let e of domain) {
      newSet.set(e, func.valueAt(setA.getValueAt(e), setB.getValueAt(e)));
    }

    return newSet;
  }

  static zadehNot(): IUnaryFunction {
    return {
      valueAt(a) {
        return 1 - a;
      }
    }
  }
  
  static zadehAnd(): IBinaryFunction {
    return {
      valueAt(a, b) {
        return Math.min(a, b);
      }
    }
  }

  static zadehOr(): IBinaryFunction {
    return {
      valueAt(a, b) {
        return Math.max(a, b);
      }
    }
  }

  static hamacherTNorm(v: number): IBinaryFunction {
    return {
      valueAt(a, b) {
        return (a * b) / (v + (1 - v) * (a + b - a * b));
      }
    }
  }

  static hamacherSNorm(v: number): IBinaryFunction {
    return {
      valueAt(a, b) {
        return (a + b - (2 - v) * a * b) / (1 - (1 - v) * a * b);
      }
    }
  }
}