import EliminationAlgorithm from "./EliminationAlgorithm";
import { readFileSync } from "fs";


const iterations = 10000;
const populationSize = 30;
const lowerBound = -4;
const upperBound = 4;
const numGenes = 5;
const recordsFile = './dataset1.txt';
const mutationProbability = 0.01;
const eliminationAlgorithm = new EliminationAlgorithm({ numGenes, iterations, populationSize, lowerBound, upperBound, mutationProbability});

const recordsFileContent = readFileSync(recordsFile, {encoding: 'utf8'});
const records = recordsFileContent.split('\n').map((line) => {
  const [x, y, value] = line.split('\t').map((s) => parseFloat(s));
  return {x, y, value};
});

eliminationAlgorithm.run(records);