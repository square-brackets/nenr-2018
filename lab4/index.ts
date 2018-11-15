import EliminationAlgorithm from "./EliminationAlgorithm";
import { readFileSync } from "fs";
import GenerationalAlgorithm from "./GenerationalAlgorithm";

const iterations = 10000;
const populationSize = 100;
const lowerBound = -4;
const upperBound = 4;
const numGenes = 5;
const mutationProbability = 0.01;
const elitism = true;
const eliminationAlgorithm1 = new EliminationAlgorithm({ numGenes, iterations, populationSize, lowerBound, upperBound, mutationProbability });
const generationalAlgorithm1 = new GenerationalAlgorithm({ numGenes, iterations, populationSize, lowerBound, upperBound, mutationProbability, elitism });

const records1 = readFileSync('./dataset1.txt', { encoding: 'utf8' }).split('\n').map((line) => {
  const [x, y, value] = line.split('\t').map((s) => parseFloat(s));
  return {x, y, value};
});

eliminationAlgorithm1.run(records1);
generationalAlgorithm1.run(records1);

console.log('\n============================\n');

const eliminationAlgorithm2 = new EliminationAlgorithm({ numGenes, iterations, populationSize, lowerBound, upperBound, mutationProbability });
const generationalAlgorithm2 = new GenerationalAlgorithm({ numGenes, iterations, populationSize, lowerBound, upperBound, mutationProbability, elitism });

const records2 = readFileSync('./dataset2.txt', { encoding: 'utf8' }).split('\n').map((line) => {
  const [x, y, value] = line.split('\t').map((s) => parseFloat(s));
  return {x, y, value};
});

eliminationAlgorithm2.run(records2);
generationalAlgorithm2.run(records2);