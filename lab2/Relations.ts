import {IFuzzySet, MutableFuzzySet} from '../lab1/FuzzySet';
import DomainElement from '../lab1/DomainElement';
import { CompositeDomain } from '../lab1/Domain';

export default class Relations {
  static isUtimesURelation(relation: IFuzzySet) {
    const domain = relation.getDomain();

    if (domain.getNumberOfComponents() !== 2) {
      return false;
    }

    return domain.getComponent(0) === domain.getComponent(1);
  }

  static isSymmetric(relation: IFuzzySet) {
		if (!this.isUtimesURelation(relation)) {
			return false;
		}

		for (let e of relation.getDomain()) {
			const simetric = DomainElement.of(e.getComponentValue(1), e.getComponentValue(0));
			if (relation.getValueAt(e) !== relation.getValueAt(simetric)) {
				return false;
			}
		}

		return true;
	}

	static isReflexive(relation: IFuzzySet) {
		if (!this.isUtimesURelation(relation)) {
			return false;
		}

		for (let e of relation.getDomain()) {
			if (e.getComponentValue(0) === e.getComponentValue(1) && relation.getValueAt(e) !== 1) {
				return false;
			}
		}

		return true;
	}


	static isMaxMinTransitive(relation: IFuzzySet) {
		if (!this.isUtimesURelation(relation)) {
			return false;
		}

		for (let e0 of relation.getDomain()) {
			const e00 = e0.getComponentValue(0);
			const e01 = e0.getComponentValue(1);
			for (let e1 of relation.getDomain()) {
				const e10 = e1.getComponentValue(0);
				const e11 = e1.getComponentValue(1);
				
				if (e01 !== e10) {
					continue;
				}

				if (relation.getValueAt(DomainElement.of(e00, e11)) < Math.min(relation.getValueAt(e0), relation.getValueAt(e1))) {
					return false;
				}
			}
		}

		return true;
	}

	static compositionOfBinaryRelations(relation1: IFuzzySet, relation2: IFuzzySet) {
		const u = relation1.getDomain().getComponent(0);
		const v = relation1.getDomain().getComponent(1);
		const w = relation2.getDomain().getComponent(1);

		const newDomain = new CompositeDomain([u, w]);
		const r3 = new MutableFuzzySet(newDomain)

		for (let e1 of u) {
			for (let e2 of w) {
				let value = 0;
				for (let e3 of v) {
					value = Math.max(
						value,
						Math.min(
							relation1.getValueAt(DomainElement.of(e1.getComponentValue(0), e3.getComponentValue(0))),
							relation2.getValueAt(DomainElement.of(e3.getComponentValue(0), e2.getComponentValue(0)))
						)
					);
				}

				r3.set(DomainElement.of(e1.getComponentValue(0), e2.getComponentValue(0)), value);
			}
		}

		return r3;
	}

	static isFuzzyEquivalence(relation: IFuzzySet) {
		return this.isReflexive(relation) && this.isSymmetric(relation) && this.isMaxMinTransitive(relation);
	}
}