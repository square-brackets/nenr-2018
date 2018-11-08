import * as readline from 'readline';
import COADefuzzifier from './COADefuzzifier';
import AccelerationFuzzySystemMin from './AccelerationFuzzySystemMin';
import RudderFuzzySystemMin from './RudderFuzzySystemMin';

const defuzzifier = new COADefuzzifier();
const accelerationFuzzySystemMin = new AccelerationFuzzySystemMin(defuzzifier);
const rudderFuzzySystemMin = new RudderFuzzySystemMin(defuzzifier);

const lineReader = readline.createInterface({
  input: process.stdin,
  terminal: true
});

lineReader.on('line', (line: string) => {
  const trimedLine = line.trim();
  if (line === 'KRAJ') {
    lineReader.close();
    return;
  }

  const components = trimedLine.split(' ');
  console.error(...components);
  if (components.length === 2) {
    return;
  }

  const [left, right, leftAngle, rightAngle, velocity, direction] = components.map(Number);
  const newAcceleration = accelerationFuzzySystemMin.conclude(left, right, leftAngle, rightAngle, velocity, direction);
  const newRudder = rudderFuzzySystemMin.conclude(left, right, leftAngle, rightAngle, velocity, direction);
  // console.log(`${newAcceleration} ${newRudder}`);
  console.log(`0 ${newRudder}`);
  console.error(`${newAcceleration} ${newRudder}`);
});
