import Example from "./example";

class Rule {
  A1: number;
  A2: number;
  B1: number;
  B2: number;
  p: number;
  q: number;
  r: number;

  dA1: number = 0;
  dA2: number = 0;
  dB1: number = 0;
  dB2: number = 0;
  dp: number = 0;
  dq: number = 0;
  dr: number = 0;

  alpha: number;
  beta: number;
  w: number;
  wNorm: number;
  z: number;

  constructor() {
    this.A1 = Math.random();
    this.A2 = Math.random();
    this.B1 = Math.random();
    this.B2 = Math.random();
    this.p = Math.random();
    this.q = Math.random();
    this.r = Math.random();
  }

  updateParameters(learningRate) {
    this.A1 += learningRate * this.dA1;
    this.A2 += learningRate * this.dA2;
    this.B1 += learningRate * this.dB1;
    this.B2 += learningRate * this.dB2;
    this.p += learningRate * this.dp;
    this.q += learningRate * this.dq;
    this.r += learningRate * this.dr;
  }

  updateDerivations(error: number, example: Example, part: number): any {
    this.dA1 += error * part * this.beta * this.alpha * (1 - this.alpha) * this.A2;
    this.dA2 += error * part * this.beta * this.alpha * (1 - this.alpha) * (this.A1 - example.x);
    this.dB1 += error * part * this.alpha * this.beta * (1 - this.beta) * this.B2;
    this.dB2 += error * part * this.alpha * this.beta * (1 - this.beta) * (this.B1 - example.y);

    this.dp += error * this.wNorm * example.x;
    this.dq += error * this.wNorm * example.y;
    this.dr += error * this.wNorm;
  }

  resetDerivations() {
    this.dA1 = 0;
    this.dA2 = 0;
    this.dB1 = 0;
    this.dB2 = 0;
    this.dp = 0;
    this.dq = 0;
    this.dr = 0;
  }
}

export default Rule;

//   public String toString() {
//     return "" + A1 + " " + A2 + " " + B1 + " " + B2;
//   }