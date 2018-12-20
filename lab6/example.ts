class Example {
  constructor(public x: number, public y: number) {
  }

  get value() {
    return (Math.pow((this.x - 1), 2) + Math.pow((this.y + 2), 2) - 5 * this.x * this.y + 3) * Math.pow(Math.cos(this.x / 5), 2);
  }
}

export default Example;