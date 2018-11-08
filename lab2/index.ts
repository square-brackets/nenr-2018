import Domain from '../lab1/Domain';
import { MutableFuzzySet } from '../lab1/FuzzySet';
import DomainElement from '../lab1/DomainElement';
import Relations from './Relations';

// ZADATAK 1

const u1_1 = Domain.intRange(1, 6);
const u1_2 = Domain.combine(u1_1, u1_1);

const r1_1 = new MutableFuzzySet(u1_2)
  .set(DomainElement.of(1, 1), 1)
  .set(DomainElement.of(2, 2), 1)
  .set(DomainElement.of(3, 3), 1)
  .set(DomainElement.of(4, 4), 1)
  .set(DomainElement.of(5, 5), 1)
  .set(DomainElement.of(3, 1), 0.5)
  .set(DomainElement.of(1, 3), 0.5);

const r1_2 = new MutableFuzzySet(u1_2)
  .set(DomainElement.of(1, 1), 1)
  .set(DomainElement.of(2, 2), 1)
  .set(DomainElement.of(3, 3), 1)
  .set(DomainElement.of(4, 4), 1)
  .set(DomainElement.of(5, 5), 1)
  .set(DomainElement.of(3, 1), 0.5)
  .set(DomainElement.of(1, 3), 0.1);

const r1_3 = new MutableFuzzySet(u1_2)
  .set(DomainElement.of(1, 1), 1)
  .set(DomainElement.of(2, 2), 1)
  .set(DomainElement.of(3, 3), 0.3)
  .set(DomainElement.of(4, 4), 1)
  .set(DomainElement.of(5, 5), 1)
  .set(DomainElement.of(1, 2), 0.6)
  .set(DomainElement.of(2, 1), 0.6)
  .set(DomainElement.of(2, 3), 0.7)
  .set(DomainElement.of(3, 2), 0.7)
  .set(DomainElement.of(3, 1), 0.5)
  .set(DomainElement.of(1, 3), 0.5);

const r1_4 = new MutableFuzzySet(u1_2)
  .set(DomainElement.of(1, 1), 1)
  .set(DomainElement.of(2, 2), 1)
  .set(DomainElement.of(3, 3), 1)
  .set(DomainElement.of(4, 4), 1)
  .set(DomainElement.of(5, 5), 1)
  .set(DomainElement.of(1, 2), 0.4)
  .set(DomainElement.of(2, 1), 0.4)
  .set(DomainElement.of(2, 3), 0.5)
  .set(DomainElement.of(3, 2), 0.5)
  .set(DomainElement.of(1, 3), 0.4)
  .set(DomainElement.of(3, 1), 0.4);

const test1 = Relations.isUtimesURelation(r1_1);
console.log('r1 je definiran nad UxU?', test1);

const test2 = Relations.isSymmetric(r1_1);
console.log('r1 je simetrična?', test2);

const test3 = Relations.isSymmetric(r1_2);
console.log('r1 je definiran nad UxU?', test3);

const test4 = Relations.isReflexive(r1_1);
console.log('r1 je refleksivna?', test4);

const test5 = Relations.isReflexive(r1_3);
console.log('r3 je refleksivna?', test5);

const test6 = Relations.isMaxMinTransitive(r1_3);
console.log('r3 je max-min tranzitivna?', test6);

const test7 = Relations.isMaxMinTransitive(r1_4);
console.log('r4 je max-min tranzitivna?', test7);

// ZADATAK 2

const u2_1 = Domain.intRange(1, 5); // {1,2,3,4}
const u2_2 = Domain.intRange(1, 4); // {1,2,3}
const u2_3 = Domain.intRange(1, 5); // {1,2,3,4}
const r2_1 = new MutableFuzzySet(Domain.combine(u2_1, u2_2))
  .set(DomainElement.of(1, 1), 0.3)
  .set(DomainElement.of(1, 2), 1)
  .set(DomainElement.of(3, 3), 0.5)
  .set(DomainElement.of(4, 3), 0.5);

const r2_2 = new MutableFuzzySet(Domain.combine(u2_2, u2_3))
  .set(DomainElement.of(1, 1), 1)
  .set(DomainElement.of(2, 1), 0.5)
  .set(DomainElement.of(2, 2), 0.7)
  .set(DomainElement.of(3, 3), 1)
  .set(DomainElement.of(3, 4), 0.4);

const r2_1r2_2 = Relations.compositionOfBinaryRelations(r2_1, r2_2);
for (let e of r2_1r2_2.getDomain()) {
  console.log(`mu(${e})=${r2_1r2_2.getValueAt(e)}`);
}

// ZADATAK 3

const u3_1 = Domain.intRange(1, 5); // {1,2,3,4}
const r3_1 = new MutableFuzzySet(Domain.combine(u3_1, u3_1))
  .set(DomainElement.of(1, 1), 1)
  .set(DomainElement.of(2, 2), 1)
  .set(DomainElement.of(3, 3), 1)
  .set(DomainElement.of(4, 4), 1)
  .set(DomainElement.of(1, 2), 0.3)
  .set(DomainElement.of(2, 1), 0.3)
  .set(DomainElement.of(2, 3), 0.5)
  .set(DomainElement.of(3, 2), 0.5)
  .set(DomainElement.of(3, 4), 0.2)
  .set(DomainElement.of(4, 3), 0.2);

let r3_2 = r3_1;
console.log('Početna relacija je neizrazita relacija ekvivalencije?', Relations.isFuzzyEquivalence(r3_2));
console.log();

Array.from({length: 3}).forEach((i) => {
  r3_2 = Relations.compositionOfBinaryRelations(r3_2, r3_1);
  
  console.log(`Broj odrađenih kompozicija: ${i}. Relacija je:`);
  
  for (let e of r3_2.getDomain()) {
    console.log(`mu(${e})=${r3_2.getValueAt(e)}`);
  }

  console.log('Ova relacija je neizrazita relacija ekvivalencije?', Relations.isFuzzyEquivalence(r3_2));
  console.log();
});