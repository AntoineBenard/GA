import { getRandomChar,
  getRandomArrayString,
  getRandomIndividual,
  getRandomPopulation,
  getIndividualFitness,
  getAveragePopulationGrade,
  gradePopulation,
  getTopGradedIndividuals,
  mutateIndividual,
  crossoverParents,
  evolvePopulation } from './../GaFunctions/GaFunctions';
import * as GaConstants from './../constants/GaConstants';

const randomPopulation = getRandomPopulation();

test('getRandomChar returns defined', () => {
  const randomChar = getRandomChar();
  expect(randomChar).toBeDefined();
});

test('getRandomChar returns a char', () => {
  const randomChar = getRandomChar();
  expect(randomChar.length === 1 && randomChar.match(/[a-z]/i)).toBeTruthy();
});

test('getRandomChar returns a char from ALLOWED_CHARMAP', () => {
  const randomChar = getRandomChar();
  expect(GaConstants.ALLOWED_CHARMAP).toContain(randomChar);
});

test('getRandomArrayString returns defined', () => {
  const randomArrayString = getRandomArrayString();
  expect(randomArrayString).toBeDefined();
});

test('getRandomArrayString returns an array', () => {
  const randomArrayString = getRandomArrayString();
  expect(Array.isArray(randomArrayString)).toBeTruthy();
});

test('getRandomArrayString returns an array of LENGTH_OF_EXPECTED_STR', () => {
  const randomArrayString = getRandomArrayString();
  expect(randomArrayString.length).toBe(GaConstants.LENGTH_OF_EXPECTED_STR);
});

test('getRandomIndividual returns defined', () => {
  const randomIndividual = getRandomIndividual();
  expect(randomIndividual).toBeDefined();
});

test('getRandomIndividual returns an object', () => {
  const randomIndividual = getRandomIndividual();
  expect(randomIndividual === Object(randomIndividual)).toBeTruthy();
});

test('getRandomIndividual returns an object with property individual', () => {
  const randomIndividual = getRandomIndividual();
  expect(randomIndividual).toHaveProperty('individual');
});

test('getRandomIndividual returns an object with property fitness', () => {
  const randomIndividual = getRandomIndividual();
  expect(randomIndividual).toHaveProperty('fitness');
});

test('getRandomPopulation returns defined', () => {
  expect(randomPopulation).toBeDefined();
});

test('getRandomPopulation returns an array', () => {
  expect(Array.isArray(randomPopulation)).toBeTruthy();
});

test('getRandomPopulation returns an array', () => {
  expect(Array.isArray(randomPopulation)).toBeTruthy();
});

test('getRandomPopulation returns an array of POPULATION_COUNT length', () => {
  expect(randomPopulation.length).toBe(GaConstants.POPULATION_COUNT);
});

test('getIndividualFitness returns defined', () => {
  const individualFitness = getIndividualFitness(getRandomIndividual());
  expect(individualFitness).toBeDefined();
});

test('getIndividualFitness returns a number', () => {
  const individualFitness = getIndividualFitness(getRandomIndividual());
  expect(Number.isInteger(individualFitness)).toBeTruthy();
});

test('getIndividualFitness returns number greater or equal to zero', () => {
  const individualFitness = getIndividualFitness(getRandomIndividual());
  expect(Number.isInteger(individualFitness) >= 0).toBeTruthy();
});

test('getAveragePopulationGrade returns defined', () => {
  const averagePopulationGrade = getAveragePopulationGrade(randomPopulation);
  expect(averagePopulationGrade).toBeDefined();
});

test('getAveragePopulationGrade returns a number', () => {
  const averagePopulationGrade = getAveragePopulationGrade(randomPopulation);
  const isNumeric = (!Number.isNaN(parseFloat(averagePopulationGrade)) &&
                      Number.isFinite(averagePopulationGrade));
  expect(isNumeric).toBeTruthy();
});

test('getAveragePopulationGrade returns a number greater or equal to zero', () => {
  const averagePopulationGrade = getAveragePopulationGrade(randomPopulation);
  expect(averagePopulationGrade >= 0).toBeTruthy();
});

test('gradePopulation returns defined', () => {
  const gradedPopulation = gradePopulation(randomPopulation);
  expect(gradedPopulation).toBeDefined();
});

test('gradePopulation returns an array', () => {
  const gradedPopulation = gradePopulation(randomPopulation);
  expect(Array.isArray(gradedPopulation)).toBeTruthy();
});

test('gradePopulation returns an array of object', () => {
  const gradedPopulation = gradePopulation(randomPopulation);
  let isObject = false;
  for (let i = 0; i < gradedPopulation.length; i += 1) {
    isObject = gradedPopulation[i] === Object(gradedPopulation[i]);
    if (!isObject) {
      break;
    }
  }
  expect(isObject).toBeTruthy();
});

test('gradePopulation returns an array of object ordered by fitness', () => {
  const gradedPopulation = gradePopulation(randomPopulation);
  let isOrdered = false;
  for (let i = 0; i < gradedPopulation.length; i += 1) {
    if (gradedPopulation[i] && typeof gradedPopulation[i].fitness === 'number' && gradedPopulation[i + 1] && typeof gradedPopulation[i + 1].fitness === 'number') {
      isOrdered = gradedPopulation[i].fitness >= gradedPopulation[i + 1].fitness;
      if (!isOrdered) {
        break;
      }
    }
  }
  expect(isOrdered).toBeTruthy();
});

test('getTopGradedIndividuals returns defined', () => {
  const topGradedIndividuals =
    getTopGradedIndividuals(randomPopulation, GaConstants.GRADED_INDIVIDUAL_RETAIN_COUNT);
  expect(topGradedIndividuals).toBeDefined();
});

test('getTopGradedIndividuals returns an array', () => {
  const topGradedIndividuals =
    getTopGradedIndividuals(randomPopulation, GaConstants.GRADED_INDIVIDUAL_RETAIN_COUNT);
  expect(Array.isArray(topGradedIndividuals)).toBeTruthy();
});

test('getTopGradedIndividuals returns an array of object', () => {
  const topGradedIndividuals =
    getTopGradedIndividuals(randomPopulation, GaConstants.GRADED_INDIVIDUAL_RETAIN_COUNT);
  let isObject = false;
  for (let i = 0; i < topGradedIndividuals.length; i += 1) {
    isObject = topGradedIndividuals[i] === Object(topGradedIndividuals[i]);
    if (!isObject) {
      break;
    }
  }
  expect(isObject).toBeTruthy();
});

test('getTopGradedIndividuals returns an array not empty', () => {
  const topGradedIndividuals =
    getTopGradedIndividuals(randomPopulation, GaConstants.GRADED_INDIVIDUAL_RETAIN_COUNT);
  expect(topGradedIndividuals.length > 0).toBeTruthy();
});

test('mutateIndividual returns defined', () => {
  const mutatedIndividual = mutateIndividual(getRandomIndividual());
  expect(mutatedIndividual).toBeDefined();
});

test('mutateIndividual returns an object', () => {
  const mutatedIndividual = mutateIndividual(getRandomIndividual());
  expect(mutatedIndividual === Object(mutatedIndividual)).toBeTruthy();
});

test('mutateIndividual returns an object with property individual', () => {
  const mutatedIndividual = mutateIndividual(getRandomIndividual());
  expect(mutatedIndividual).toHaveProperty('individual');
});

test('mutateIndividual returns an object with property fitness', () => {
  const mutatedIndividual = mutateIndividual(getRandomIndividual());
  expect(mutatedIndividual).toHaveProperty('fitness');
});

test('mutateIndividual returns an object with property individual of LENGTH_OF_EXPECTED_STR', () => {
  const mutatedIndividual = mutateIndividual(getRandomIndividual());
  expect(mutatedIndividual.individual.length === GaConstants.LENGTH_OF_EXPECTED_STR).toBeTruthy();
});

test('crossoverParents returns defined', () => {
  const child = crossoverParents(getRandomIndividual(), getRandomIndividual());
  expect(child).toBeDefined();
});

test('crossoverParents returns an object', () => {
  const child = crossoverParents(getRandomIndividual(), getRandomIndividual());
  expect(child === Object(child)).toBeTruthy();
});

test('crossoverParents returns an object with property individual', () => {
  const child = crossoverParents(getRandomIndividual(), getRandomIndividual());
  expect(child).toHaveProperty('individual');
});

test('crossoverParents returns an object with property fitness', () => {
  const child = crossoverParents(getRandomIndividual(), getRandomIndividual());
  expect(child).toHaveProperty('fitness');
});

test('crossoverParents returns an object with property individual of LENGTH_OF_EXPECTED_STR', () => {
  const child = crossoverParents(getRandomIndividual(), getRandomIndividual());
  expect(child.individual.length === GaConstants.LENGTH_OF_EXPECTED_STR).toBeTruthy();
});

test('evolvePopulation returns defined', () => {
  const evolvedPopulation = evolvePopulation(getRandomPopulation());
  expect(evolvedPopulation).toBeDefined();
});

test('evolvePopulation returns an object', () => {
  const evolvedPopulation = evolvePopulation(getRandomPopulation());
  expect(evolvedPopulation === Object(evolvedPopulation)).toBeTruthy();
});

test('evolvePopulation returns an object with property population', () => {
  const evolvedPopulation = evolvePopulation(getRandomPopulation());
  expect(evolvedPopulation).toHaveProperty('population');
});

test('evolvePopulation returns an object with property averageGrade', () => {
  const evolvedPopulation = evolvePopulation(getRandomPopulation());
  expect(evolvedPopulation).toHaveProperty('averageGrade');
});

test('evolvePopulation returns an object with property solution', () => {
  const evolvedPopulation = evolvePopulation(getRandomPopulation());
  expect(evolvedPopulation).toHaveProperty('solution');
});

test('evolvePopulation returns an object with population length of POPULATION_COUNT', () => {
  const evolvedPopulation = evolvePopulation(getRandomPopulation());
  expect(evolvedPopulation.population.length === GaConstants.POPULATION_COUNT).toBeTruthy();
});
