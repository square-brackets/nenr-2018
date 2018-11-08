import { IDefuzzifier } from './COADefuzzifier';
import BaseFuzzySystem from './BaseFuzzySystem';
import { Term, Rule } from './Term';

export default class RudderFuzzySystemMin extends BaseFuzzySystem {
  rules: Rule[];

  constructor(defuzzyfier: IDefuzzifier) {
    super(defuzzyfier);

    this.rules = [
      new Rule([this.distance.getTermByName('close')], this.rudder.getTermByName('sharpRight')),
      new Rule([this.distance.getTermByName('close')], this.rudder.getTermByName('sharpLeft')),
      new Rule([this.distance.getTermByName('middle'), this.speed.getTermByName('fast')], this.rudder.getTermByName('sharpRight')),
      new Rule([this.distance.getTermByName('middle'), this.speed.getTermByName('fast')], this.rudder.getTermByName('sharpLeft')),
      new Rule([this.distance.getTermByName('middle'), this.speed.getTermByName('slow')], this.rudder.getTermByName('turnRight')),
      new Rule([this.distance.getTermByName('middle'), this.speed.getTermByName('slow')], this.rudder.getTermByName('turnLeft')),
      new Rule([this.distance.getTermByName('far')], this.rudder.getTermByName('straight')),
      new Rule([this.direction.getTermByName('bad')], this.rudder.getTermByName('sharpRight')),
    ];
  }

  conclude(left: number, right: number, leftAngle: number, rightAngle: number, speed: number, direction: number) {
    // const func = { valueAt: (a, b) => Math.min(a, b) };
    const func = { valueAt: (a, b) => a * b };

    const ruleValues = [
      this.rules[0].getConclusion(func, leftAngle),
      this.rules[0].getConclusion(func, left),

      this.rules[1].getConclusion(func, rightAngle),
      this.rules[1].getConclusion(func, right),

      this.rules[2].getConclusion(func, leftAngle, speed),
      this.rules[2].getConclusion(func, left, speed),

      this.rules[3].getConclusion(func, rightAngle, speed),
      this.rules[3].getConclusion(func, right, speed),

      this.rules[4].getConclusion(func, leftAngle, speed),
      this.rules[4].getConclusion(func, left, speed),

      this.rules[5].getConclusion(func, rightAngle, speed),
      this.rules[5].getConclusion(func, right, speed),

      this.rules[6].getConclusion(func, leftAngle),
      this.rules[6].getConclusion(func, rightAngle),
      this.rules[6].getConclusion(func, left),
      this.rules[6].getConclusion(func, right),

      this.rules[7].getConclusion(func, direction)
    ];

    // console.error('#', this.defuzzyfier.defuzzify(ruleValues))

    return this.defuzzyfier.defuzzify(ruleValues) - 90;
  }
}