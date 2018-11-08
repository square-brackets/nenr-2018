import { IIntUnaryFunction } from './FuzzySet';

export class StandardFuzzySets {
  static lFunction(alfa: number, beta: number): IIntUnaryFunction {
    return {
      valueAt(x: number) {
        if (x < alfa) {
          return 1;
        }

        if (x >= beta) {
          return 0;
        }

        return (beta - x) / (beta - alfa);
      }
    }
  }

  static gammaFunction(alfa: number, beta: number): IIntUnaryFunction {
    return {
      valueAt(x: number) {
        if (x < alfa) {
          return 0;
        }

        if (x >= beta) {
          return 1;
        }

        return (x - alfa) / (beta - alfa);
      }
    }
  }

  static lambdaFunction(alfa: number, beta: number, gamma: number): IIntUnaryFunction {
    return {
      valueAt(x: number) {
        if (x < alfa) {
          return 0;
        }

        if (x >= gamma) {
          return 0;
        }

        if (x >= alfa && x < beta) {
          return (x - alfa) / (beta - alfa);
        }

        return (gamma - x) / (gamma - beta);
      }
    }
  }
}