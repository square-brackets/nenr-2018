import { IRecord, calculateChromosomeFitness } from "./EliminationAlgorithm";
import Population from "./Population";
import { rouletteWheelSelection } from "./selection";
import { arithmeticCrossover } from "./crossover";
import { uniformMutation } from "./mutation";

export interface IAlgorithmOptions {
  populationSize: number,
  numGenes: number,
  lowerBound: number,
  upperBound: number,
  iterations: number,
  mutationProbability: number,
  elitism: boolean
}

export default class GenerationalAlgorithm {
  population: Population;
  iteration = 0;

  constructor(private options: IAlgorithmOptions) {

  }

  run(records: IRecord[]) {
    const { populationSize, numGenes, lowerBound, upperBound, elitism, mutationProbability } = this.options;
    this.population = new Population(populationSize, numGenes, upperBound, lowerBound);

    this.population.chromosomes.forEach((chromosome) => calculateChromosomeFitness(chromosome, records));

    let bestError = Infinity;
    let bestErrorChromosome = null;
    let counterOfBest = 0;

    while (this.iteration < this.options.iterations) {

      const newGeneration = new Population(populationSize, numGenes, upperBound, lowerBound);
      newGeneration.chromosomes = [];

      if (elitism) {
        this.population.sortByFitness();
        newGeneration.chromosomes = [this.population.chromosomes[0]];
      }

      const numberOfPairs = this.population.chromosomes.length - newGeneration.chromosomes.length;
      const children = Array.from({length: numberOfPairs}).map(() => {
        const parents = rouletteWheelSelection(2, this.population);
        const child = arithmeticCrossover(parents[0], parents[1]);
        uniformMutation(child, mutationProbability);
        return child;
      });

      newGeneration.chromosomes.push(...children);
      newGeneration.chromosomes.forEach((chromosome) => calculateChromosomeFitness(chromosome, records));

      newGeneration.sortByFitness();
      const bestChromosome = newGeneration.chromosomes[0];
      this.population = newGeneration;

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