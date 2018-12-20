import Example from "./example";
import ANFIS from "./anfis";

const NUMBER_OF_RULES = 7;
const LEARNING_RATE = 1e-4;
const BATCH_MODE = false;

const data = [];
for (let i = -4; i < 5; i++) {
  for (let j = -4; j < 5; j++) {
    data.push(new Example(i, j));
  }
}

const anfis = new ANFIS(NUMBER_OF_RULES);
anfis.train(data, LEARNING_RATE, BATCH_MODE);

data.forEach((example) => {
  console.log(`${example.x} ${example.y} ${example.value - anfis.forwardPass(example.x, example.y)}`);
});

// for (Rule rule : anfis.getRules()) {
//   System.out.println(rule);
// }