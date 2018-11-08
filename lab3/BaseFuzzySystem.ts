import { IDefuzzifier } from './COADefuzzifier';
import { Term, Variable } from './Term';
import { CalculatedFuzzySet } from '../lab1/FuzzySet';
import { SimpleDomain, IDomain } from '../lab1/Domain';
import { StandardFuzzySets } from '../lab1/StandardFuzzySets';

export interface IFuzzySystem {
  conclude(left: number, right: number, leftAngle: number, rightAngle: number, speed: number, direction: number): number
}

export default abstract class BaseFuzzySystem {
  distance: Variable
  speed: Variable
  acceleration: Variable
  rudder: Variable
  direction: Variable;
  distanceDomain: IDomain;
  speedDomain: IDomain;
  accelerationDomain: IDomain;
  angleDomain: IDomain;
  directionDomain: IDomain;

  constructor(protected defuzzyfier: IDefuzzifier) {
    this.distanceDomain = new SimpleDomain(0, 1300);
    this.speedDomain = new SimpleDomain(0, 1300);
    this.accelerationDomain = new SimpleDomain(0, 100);
    this.angleDomain = new SimpleDomain(0, 180);
    this.directionDomain = new SimpleDomain(0, 1);

    this.distance = new Variable('distance', [
      new Term('close', new CalculatedFuzzySet(this.distanceDomain, StandardFuzzySets.lFunction(30, 40))),
      new Term('middle', new CalculatedFuzzySet(this.distanceDomain, StandardFuzzySets.lambdaFunction(30, 45, 60))),
      new Term('far', new CalculatedFuzzySet(this.distanceDomain, StandardFuzzySets.gammaFunction(40, 60))),
    ]);

    this.speed = new Variable('speed', [
      new Term('slow', new CalculatedFuzzySet(this.speedDomain, StandardFuzzySets.lFunction(10, 30))),
      new Term('fast', new CalculatedFuzzySet(this.speedDomain, StandardFuzzySets.gammaFunction(25, 100))),
    ]);

    this.acceleration = new Variable('acceleration', [
      new Term('negative', new CalculatedFuzzySet(this.accelerationDomain, StandardFuzzySets.lFunction(0, 50))),
      new Term('positive', new CalculatedFuzzySet(this.accelerationDomain, StandardFuzzySets.gammaFunction(50, 100))),
    ]);

    this.direction = new Variable('direction', [
      new Term('good', new CalculatedFuzzySet(this.directionDomain, StandardFuzzySets.lFunction(0, 1))),
      new Term('bad', new CalculatedFuzzySet(this.directionDomain, StandardFuzzySets.gammaFunction(0, 1))),
    ]);
    
    this.rudder = new Variable('rudder', [
      new Term('sharpRight', new CalculatedFuzzySet(this.angleDomain, StandardFuzzySets.lFunction(0, 30))),
      new Term('turnRight', new CalculatedFuzzySet(this.angleDomain, StandardFuzzySets.lFunction(20, 50))),
      new Term('right', new CalculatedFuzzySet(this.angleDomain, StandardFuzzySets.lFunction(0, 70))),
      new Term('straight', new CalculatedFuzzySet(this.angleDomain, StandardFuzzySets.lambdaFunction(80, 90, 100))),
      new Term('left', new CalculatedFuzzySet(this.angleDomain, StandardFuzzySets.gammaFunction(110, 180))),
      new Term('turnLeft', new CalculatedFuzzySet(this.angleDomain, StandardFuzzySets.gammaFunction(130, 160))),
      new Term('sharpLeft', new CalculatedFuzzySet(this.angleDomain, StandardFuzzySets.gammaFunction(150, 180))),
    ]);
  }

  abstract conclude(left: number, right: number, leftAngle: number, rightAngle: number, speed: number, direction: number): number;
}