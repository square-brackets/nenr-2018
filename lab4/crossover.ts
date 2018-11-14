import Chromosome from "./Chromosome";

export function arithmeticCrossover(chromosomeA: Chromosome, chromosomeB: Chromosome) {  
  const size = chromosomeA.genes.length;
  const child = new Chromosome(size);
  child.genes = child.genes.map((index) => (chromosomeA.genes[index] + chromosomeB.genes[index]) / 2);
  return child;
}