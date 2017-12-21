import * as GaConstants from './../constants/GaConstants';

export function getRandomChar() {
  const items = GaConstants.ALLOWED_CHARMAP;
  return items[Math.floor(Math.random() * items.length)];
}

export function getRandomArrayString() {
  const arrayString = [];

  for (let i = 0; i < GaConstants.LENGTH_OF_EXPECTED_STR; i += 1) {
    arrayString.push(getRandomChar());
  }
  return arrayString;
}

export function getRandomIndividual() {
  const individual = {
    individual: getRandomArrayString(),
    fitness: 0,
  };

  return Object.assign({}, individual);
}

export function getRandomPopulation() {
  const population = [];

  for (let i = 0; i < GaConstants.POPULATION_COUNT; i += 1) {
    const individual = getRandomIndividual();
    population.push(individual);
  }
  return Object.assign([], population);
}

export function getIndividualFitness(individual) {
  let fitness = 0;
  const zip = individual.individual.map((e, i) => [e, GaConstants.EXPECTED_STR[i]]);

  zip.forEach((element) => {
    if (element[0] === element[1]) {
      fitness += 1;
    }
  });
  return fitness;
}

export function getAveragePopulationGrade(population) {
  let total = 0;

  population.forEach((individual) => {
    total += getIndividualFitness(individual);
  });

  return total / GaConstants.POPULATION_COUNT;
}

export function gradePopulation(population) {
  const gradedPopulation = [];
  population.forEach((individual) => {
    gradedPopulation.push({
      individual: individual.individual,
      fitness: getIndividualFitness(individual),
    });
  });

  const sorted = gradedPopulation.sort((a, b) => b.fitness - a.fitness);
  return Object.assign([], sorted);
}

export function getTopGradedIndividuals(population, gradedIndividualRetainCount) {
  return population.slice(0, gradedIndividualRetainCount);
}

export function mutateIndividual(individual) {
  const index = Math.floor(Math.random() * GaConstants.LENGTH_OF_EXPECTED_STR);
  const string = individual.individual;
  string[index] = getRandomChar();
  const mutatedIndividual = {
    individual: string,
    fitness: 0,
  };
  return mutatedIndividual;
}

export function crossoverParents(father, mother) {
  const fatherPart = father.individual.slice(0, GaConstants.MIDDLE_LENGTH_OF_EXPECTED_STR);
  const motherPart =
    mother.individual.slice(GaConstants.MIDDLE_LENGTH_OF_EXPECTED_STR, mother.length);

  return {
    individual: [...fatherPart, ...motherPart],
    fitness: 0,
  };
}

export function getFinalSolution(solution) {
  let sol = '';
  solution.forEach((s) => {
    sol = s.individual.join('');
  });
  return sol;
}

export function evolvePopulation(population) {
  const rawGradedPopulation = gradePopulation(population);
  let averageGrade = 0;
  const solution = [];
  const gradedPopulation = [];

  rawGradedPopulation.forEach((individual) => {
    averageGrade += individual.fitness;
    gradedPopulation.push(individual);
    if (individual.fitness === GaConstants.MAXIMUM_FITNESS) {
      solution.push(individual);
    }
  });

  averageGrade /= GaConstants.POPULATION_COUNT;

  // End if solution is found
  if (solution && solution.length > 0) {
    return { population, averageGrade, solution };
  }

  // Get the top graded individual
  let parents =
    getTopGradedIndividuals(gradedPopulation, GaConstants.GRADED_INDIVIDUAL_RETAIN_COUNT);

  // Randomly add other individuals to promote genetic diversity
  const others =
    gradedPopulation.slice(GaConstants.GRADED_INDIVIDUAL_RETAIN_COUNT, gradedPopulation.length);
  others.forEach((individual) => {
    if (Math.random() < GaConstants.CHANCE_RETAIN_NONGRATED) {
      parents.push(individual);
    }
  });

  // Mutate some individuals
  parents.forEach((individual) => {
    if (Math.random() < GaConstants.CHANCE_TO_MUTATE) {
      individual = mutateIndividual(individual);
    }
  });

  // Crossover parents to create children
  const parentsLength = parents.length;
  const desiredLength = GaConstants.POPULATION_COUNT - parentsLength;
  const children = [];

  while (children.length < desiredLength) {
    const father = parents[Math.floor(Math.random() * parents.length)];
    const mother = parents[Math.floor(Math.random() * parents.length)];

    // father != mother
    if (true) {
      children.push(crossoverParents(father, mother));
    }
  }

  // The next generation is ready
  parents = parents.concat(children);

  return { population: parents, averageGrade, solution };
}
