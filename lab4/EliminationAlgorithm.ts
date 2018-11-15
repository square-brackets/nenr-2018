import Population from "./Population";
import { rouletteWheelSelection } from "./selection";
import { arithmeticCrossover } from "./crossover";
import { uniformMutation } from "./mutation";
import Chromosome from "./Chromosome";

export interface IRecord {
  x: number,
  y: number,
  value: number
}

export interface IAlgorithmOptions {
  populationSize: number,
  numGenes: number,
  lowerBound: number,
  upperBound: number,
  iterations: number,
  mutationProbability: number,
}

export const calculateChromosomeFitness = (chromosome: Chromosome, records: IRecord[]) => {
  const error = records.reduce((acc, record) => {
    const measured = record.value;
    const { x, y } = record;
    const [beta0, beta1, beta2, beta3, beta4] = chromosome.genes;
    const predicted = Math.sin(beta0 + beta1 * x) + beta2 * Math.cos(x * (beta3 + y)) / (1 + Math.exp(Math.pow(x - beta4, 2)));

    return acc + Math.pow(measured - predicted, 2);
  }, 0);

  chromosome.fitness = error / records.length;
}

export default class EliminationAlgorithm {
  population: Population;
  iteration = 0;

  constructor(private options: IAlgorithmOptions) {

  }

  run(records: IRecord[]) {
    const { populationSize, numGenes, lowerBound, upperBound} = this.options;
    this.population = new Population(populationSize, numGenes, upperBound, lowerBound);
    this.population.chromosomes.forEach((chromosome) => calculateChromosomeFitness(chromosome, records));

    let counterOfBest = 0;
    let bestError = Infinity;
    let bestErrorChromosome = null;

    while (this.iteration < this.options.iterations) {
      const tournament = rouletteWheelSelection(3, this.population);    
      const minFitness = tournament.reduce((acc, { fitness }) => Math.min(acc, fitness), Infinity);
      const worstChromosome = tournament.find(({ fitness }) => fitness === minFitness);
      const bestParents = tournament.filter((chromosome) => chromosome !== worstChromosome);

      const child = arithmeticCrossover(bestParents[0], bestParents[1]);
      uniformMutation(child, this.options.mutationProbability);

      calculateChromosomeFitness(child, records);

      const indexOfWorst = this.population.chromosomes.indexOf(worstChromosome);
      this.population.chromosomes[indexOfWorst] = child;

      this.population.chromosomes.forEach((chromosome) => calculateChromosomeFitness(chromosome, records));

      this.population.sortByFitness();
      const bestChromosome = this.population.chromosomes[0];

      if (bestChromosome.fitness <= bestError) {
        bestError = bestChromosome.fitness;
        bestErrorChromosome = bestChromosome;
        counterOfBest = 0;
      } else {
        counterOfBest++;
        if (counterOfBest >= 1000) {
          console.log('1000 iterations without improvement!');
          break;
        }
      }

      if (bestError <= 1e-6) {
        console.log(`Error is small enough. Iteration: ${this.iteration}`);
        break;
      }

      this.iteration++;
      // if (this.iteration % 100 === 0) {
      //   console.log(`[${this.iteration}]: ${bestChromosome.fitness}`);    
      // }
    }

    console.log(`Solution: ${bestError}`);
    console.log(`Total number of iterations: ${this.iteration}`);
    console.log(bestErrorChromosome);
  }
}