import Chromosome from "./Chromosome";

export function uniformMutation(chromosome: Chromosome, mutationProbability: number) {
  chromosome.genes = chromosome.genes.map((gene) => {
    return Math.random() < mutationProbability ? gene + Math.random() : gene;
  });
}