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


//     /**
//      * Implements random parent choosing.
//      *
//      * @param numOfParents Number of parents to be selected.
//      * @param population   Chromosome population.
//      * @param random       Random singleton used for random number generation.
//      * @return Array of <code>numOfParents</code> selected chromosomes.
//      */
//     public static Chromosome[] randomSelection(int numOfParents, Population population, Random random) {
//   Chromosome[] parents = new Chromosome[numOfParents];

//   for (int i = 0; i < numOfParents; i++) {
//     int index = random.nextInt(population.getSize());
//     parents[i] = population.getChromosome(index);
//   }

//   return parents;
// }