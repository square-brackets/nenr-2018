import Domain from './domain';
import DomainElement from './DomainElement';
import { CalculatedFuzzySet, MutableFuzzySet, IFuzzySet } from './FuzzySet';
import { StandardFuzzySets } from './StandardFuzzySets';
import { Operations } from './Operations';

const domainPrint = (domain: Domain, title) => {
  if (title) {
    console.log(title);
  }

  for (let e of domain) {
    console.log('Element domene:', e.toString());
  }

  console.log('Kardinalitet domene je:', domain.getCardinality());
  console.log();
}

const d1 = Domain.intRange(0, 5); // {0,1,2,3,4}
domainPrint(d1, 'Elementi domene d1:');

const d2 = Domain.intRange(0, 3); // {0,1,2}
domainPrint(d2, 'Elementi domene d2:');

const d3 = Domain.combine(d1, d2);
domainPrint(d3, 'Elementi domene d3:');

console.log(d3.elementForIndex(0))
console.log(d3.elementForIndex(5))
console.log(d3.elementForIndex(14))
console.log(d3.indexOfElement(DomainElement.of(4, 1)));


const setPrint = (set: IFuzzySet, title: string) => {
  if (title) {
    console.log(title);
  }

  for (let e of set.getDomain()) {
    console.log(`d(${e.toString()})=${set.getValueAt(e)}`);
  }

  console.log();
}

const d1s = Domain.intRange(0, 11);
const set1 = new MutableFuzzySet(d1s)
  .set(DomainElement.of(0), 1.0)
  .set(DomainElement.of(1), 0.8)
  .set(DomainElement.of(2), 0.6)
  .set(DomainElement.of(3), 0.4)
  .set(DomainElement.of(4), 0.2);
setPrint(set1, 'Set1:');


const d2s = Domain.intRange(-5, 6);
const set2 = new CalculatedFuzzySet(d2s, StandardFuzzySets.lambdaFunction(
  d2s.indexOfElement(DomainElement.of(-4)),
  d2s.indexOfElement(DomainElement.of(0)),
  d2s.indexOfElement(DomainElement.of(4)),
))
console.log(d2s.indexOfElement(DomainElement.of(-4)), d2s.indexOfElement(DomainElement.of(0)), d2s.indexOfElement(DomainElement.of(4)));

setPrint(set2, 'Set2:');



const notSet1 = Operations.unaryOperation(set1, Operations.zadehNot());
setPrint(notSet1, 'notSet1:');

const union = Operations.binaryOperation(set1, notSet1, Operations.zadehOr());
setPrint(union, 'Set1 union notSet1:');

const hinters = Operations.binaryOperation(set1, notSet1, Operations.hamacherTNorm(1))
setPrint(hinters, 'Set1 intersection with notSet1 using parameterised Hamacher T norm with parameter 1.0:');
