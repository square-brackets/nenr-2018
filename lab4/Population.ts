import Chromosome from "./Chromosome";

export default class Population {
  chromosomes: Chromosome[];

  constructor(public size: number, private numberOfGenes: number, upperBound: number, lowerBound: number) {
    this.chromosomes = Array.from({ length: size }).map(() => new Chromosome(numberOfGenes, upperBound, lowerBound));
  }

  sortByFitness() {
    this.chromosomes = this.chromosomes.sort(({fitness: fitnessA}, {fitness: fitnessB}) => fitnessA - fitnessB);
  }
}