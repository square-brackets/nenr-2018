export default class Chromosome {
  genes: number[];
  fitness: number;
  
  constructor(private size: number, upperBound?: number, lowerBound?: number) {
    if (upperBound && lowerBound) {      
      this.genes = Array.from({length: size}).map(() => lowerBound + (upperBound - lowerBound) * Math.random());
    } else {
      this.genes = Array.from({length: size}).map(() => 0);
    }

    this.fitness = 0;
  }
}