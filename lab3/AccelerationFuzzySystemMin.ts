import { IDefuzzifier } from './COADefuzzifier';
import BaseFuzzySystem from './BaseFuzzySystem';
import { Term, Rule } from './Term';

export default class AccelerationFuzzySystemMin extends BaseFuzzySystem {
  rules: Rule[];

  constructor(defuzzyfier: IDefuzzifier) {
    super(defuzzyfier);

    this.rules = [
      new Rule([this.distance.getTermByName('middle'), this.speed.getTermByName('fast')], this.acceleration.getTermByName('negative')),
      new Rule([this.distance.getTermByName('middle'), this.speed.getTermByName('slow')], this.acceleration.getTermByName('positive')),
      new Rule([this.distance.getTermByName('far'), this.distance.getTermByName('far')], this.acceleration.getTermByName('positive')),
      new Rule([this.distance.getTermByName('far'), this.speed.getTermByName('fast')], this.acceleration.getTermByName('negative')),
      new Rule([this.speed.getTermByName('fast')], this.acceleration.getTermByName('negative')),
      new Rule([this.distance.getTermByName('close')], this.acceleration.getTermByName('negative')),
    ];
  }

  conclude(left: number, right: number, leftAngle: number, rightAngle: number, speed: number, direction: number) {
    // const func = {valueAt: (a, b) => Math.min(a, b)};
    const func = {valueAt: (a, b) => a * b};

    const ruleValues = [
      this.rules[0].getConclusion(func, left, speed),
      this.rules[0].getConclusion(func, right, speed),
      this.rules[0].getConclusion(func, leftAngle, speed),
      this.rules[0].getConclusion(func, rightAngle, speed),

      this.rules[1].getConclusion(func, left, speed),
      this.rules[1].getConclusion(func, right, speed),

      this.rules[2].getConclusion(func, left, right),
      
      this.rules[3].getConclusion(func, left, speed),
      this.rules[3].getConclusion(func, right, speed),
      this.rules[3].getConclusion(func, leftAngle, speed),
      this.rules[3].getConclusion(func, rightAngle, speed),

      this.rules[4].getConclusion(func, speed),

      this.rules[5].getConclusion(func, left),
      this.rules[5].getConclusion(func, right),
      this.rules[5].getConclusion(func, leftAngle),
      this.rules[5].getConclusion(func, rightAngle)
    ];

    return this.defuzzyfier.defuzzify(ruleValues) - 50;
  }
}