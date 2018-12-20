import Example from "./example";
import Rule from "./rule";

const sigmoid = (x: number, a: number, b: number) => {
  return 1 / (1 + Math.exp(b * (x - a)));
}

class ANFIS {
  static EPSILON = 1e-6;
  static ITERATIONS = 400000;

  rules: Rule[] = [];

  constructor(public numberOfRules: number) {
  }

  train(data: Example[], learningRate: number, batch: boolean) {
    this.rules = Array.from({length: this.numberOfRules}).map(() => new Rule());

    let currentEpoch = 0;
    let epochError = Infinity;

    //   FileWriter writer = null;
    //   try {
    //     writer = new FileWriter("errors.txt");
    //   } catch (IOException e) {
    //     e.printStackTrace();
    //   }

    while (currentEpoch <= ANFIS.ITERATIONS && epochError > ANFIS.EPSILON) {
      epochError = 0;

      data.forEach((example) => {
        const output = this.forwardPass(example.x, example.y);
        const errorForExample = example.value - output;
        
        epochError += Math.pow(errorForExample, 2);
        this.updateDeltas(example, errorForExample);

        if (!batch) {
          this.updateParameters(learningRate);
        }
      });

      if (batch) {
        this.updateParameters(learningRate);
      }

      epochError *= (1 / (2 * data.length));
      
      if (currentEpoch % 1000 === 0) {
        console.log(`Epoch = ${currentEpoch}\t\tError = ${epochError}`);
      }

//     try {
//       writer.write(String.valueOf(epoch_error) + "\n");
//     } catch (IOException e) {
//       e.printStackTrace();
//     }

      currentEpoch++;
    }

    console.log('Done! 🎉');
    console.log(`Epoch = ${currentEpoch - 1}\t\tError = ${epochError}`);

    return epochError;
  }

  forwardPass(x: number, y: number) {
    const wSum = this.rules.reduce((acc, rule) => {
      // 1st layer
      rule.alpha = sigmoid(x, rule.A1, rule.A2);
      rule.beta = sigmoid(y, rule.B1, rule.B2);
      
      // 2nd layer
      rule.w = rule.alpha * rule.beta;

      acc += rule.w;
      return acc;
    }, 0);

    return this.rules.reduce((acc, rule) => {
      // 3rd layer
      rule.wNorm = rule.w / wSum;

      // 4th layer
      rule.z = rule.p * x + rule.q * y + rule.r;

      // 5th layer
      acc += rule.wNorm * rule.z;

      return acc;
    }, 0);
  }

  updateDeltas(example: Example, errorForExample: number) {
    this.rules.forEach((rule) => {
      const {first, second} = this.rules.reduce(({first, second}, r) => {
        return {
          first: first += r.w,
          second: second += r.w * (rule.z - r.z)
        };
      }, {first: 0, second: 0});

      const value = first / second;
      rule.updateDerivations(errorForExample, example, value);
    });
  }

  updateParameters(learningRate: number) {
    this.rules.forEach((rule) => {
      rule.updateParameters(learningRate);
      rule.resetDerivations();
    });
  }
}

export default ANFIS;