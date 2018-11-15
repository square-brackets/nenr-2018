import Population from "./Population";
import Chromosome from "./Chromosome";

export function rouletteWheelSelection(numberOfParents: number, population: Population) {
  const selected: Chromosome[] = [];
  Array.from({ length: numberOfParents }).forEach(() => {
    const select = selectOneParent(population.chromosomes.filter((ch) => !selected.includes(ch)));
    selected.push(select);
  });
  return selected;
}

export function selectOneParent(chromosomes: Chromosome[]) {
  const fitnessSum = chromosomes.reduce((acc, {fitness}) => acc + fitness, 0);  
  const point = fitnessSum * Math.random();
  
  chromosomes.sort(({ fitness: fitnessA }, { fitness: fitnessB }) => fitnessA - fitnessB);
  
  let bar = 0;
  return chromosomes.find(({fitness}) => {
    bar += fitness;
    return bar >= point;
  });
}