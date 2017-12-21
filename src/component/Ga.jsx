import React, { Component } from 'react';
import * as GaConstants from './../constants/GaConstants';
import { getRandomPopulation, getAveragePopulationGrade, evolvePopulation, getFinalSolution } from './../GaFunctions/GaFunctions';

export class Ga extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expectedString: GaConstants.EXPECTED_STR,
      logs: [],
    };


    this.handleOnChange = this.handleOnChange.bind(this);
    this.main = this.main.bind(this);
  }

  handleOnChange(event) {
    this.setState({
      ...this.state,
      expectedString: event.target.value,
    });
  }

  log(string) {
    setTimeout(() => {
      const logCopy = Object.assign([], this.state.logs);
      logCopy.unshift({ line: logCopy.length, value: string });

      this.setState({
        ...this.state,
        logs: logCopy,
      });
    }, 0);
  }

  clearLogs() {
    setTimeout(() => {
      this.setState({
        ...this.state,
        logs: [],
      });
    }, 0);
  }

  main() {
    this.clearLogs();

    // Create a population and compute starting grade
    let population = getRandomPopulation();
    let averageGrade = getAveragePopulationGrade(population);
    this.log(`Starting grade: ${averageGrade} / ${GaConstants.MAXIMUM_FITNESS}`);

    // Make the population evolve
    let i = 0;
    let solution = [];

    while (solution && solution.length === 0 && i < GaConstants.GENERATION_COUNT_MAX) {
      const evolvePopulationResult = evolvePopulation(population);
      population = evolvePopulationResult.population;
      solution = evolvePopulationResult.solution;
      averageGrade = evolvePopulationResult.averageGrade;

      if (i % 10 === 1) {
        this.log(`Current grade: ${averageGrade} / ${GaConstants.MAXIMUM_FITNESS} (generation ${i})`);
      }

      i += 1;
    }

    // Print the final stats
    averageGrade = getAveragePopulationGrade(population);
    this.log(`Final grade: ${averageGrade} / ${GaConstants.MAXIMUM_FITNESS}`);

    this.setState({
      ...this.state,
      averageGrade,
    });

    // Print the solution
    if (solution && solution.length > 0) {
      this.log(`Solution found ${solution.length} after ${i} generations: ${getFinalSolution(solution)}`);
    } else {
      this.log(`No solution found after ${i} generations.`);
      this.log('Last population was:');
      population.forEach((individual) => {
        this.log(individual.individual);
      });
    }
  }

  render() {
    return (
      <div>
        <div>
        Phrase à trouver :
        <input type="text" value={this.state.expectedString} onChange={this.handleOnChange} />
          <button onClick={this.main}>GO !</button>
        </div>
        <div>
          {this.state.logs.map(log =>
            (<div key={log.line}>
              {log.value}
            </div>))
          }
        </div>
      </div>
    );
  }
}

export default Ga;
