// dijkstra algorithm
var dijkstra = require('./dijkstra');

function prepareProblemData(graph, start, finish) {
  let problem = {};
  for (let index = 0; index < graph.length; index++) {
    const link = graph[index];
    let source = link.source.name;
    let target = link.target.name;
    let value = link.distance;

    if (source === start) {
      source = 'start';
    } else if (target === start) {
      target = 'start';
    }

    if (source === finish) {
      source = 'finish';
    } else if (target === finish) {
      target = 'finish';
    }

    if (!problem[source]) {
      problem[source] = { [target]: value };
    } else {
      let element = problem[source];
      element[target] = value;
    }
  }

  if (problem['finish']) {
    for (var shild in problem['finish']) {
      if (problem['finish'].hasOwnProperty(shild)) {
        if (!problem[shild]) problem[shild] = {};
        problem[shild]['finish'] = problem['finish'][shild];
      }
    }
  }
  problem['finish'] = {};

  if (!problem.start) {
    const keys = Object.keys(problem);
    for (const key of keys) {
      let element = problem[key];
      if (element.start) {
        let distance = element.start;
        if (!problem.start) {
          let starting = { [key]: distance };
          problem['start'] = starting;
        } else {
          problem['start'][key] = distance;
        }
        delete element.start;
      }
    }
  }

  return problem;
}

function organize(problem) {
  let newProblem = {};
  newProblem.start = problem.start;

  let processed = [],
    visited = [];

  // init start
  visited.push('start');
  for (var property in problem.start) {
    if (problem.start.hasOwnProperty(property)) {
      processed.push(property);
    }
  }

  while (processed.length) {
    let element = processed.splice(0, 1);
    element = element[0];

    // add elements
    for (var shild in problem[element]) {
      if (!visited.includes(shild)) {
        if (!newProblem[element]) newProblem[element] = {};
        newProblem[element][shild] = problem[element][shild];
      }
    }

    for (var properties in problem) {
      if (problem.hasOwnProperty(properties)) {
        let newProperties = problem[properties];
        for (var property in newProperties) {
          if (newProperties.hasOwnProperty(property)) {
            if (property === element && !visited.includes(properties)) {
              if (!newProblem[element]) newProblem[element] = {};
              newProblem[element][properties] = newProperties[property];
            }
          }
        }
      }
    }

    // save element as visited
    visited.push(element);

    // add element shildren
    let shildren = newProblem[element];
    for (var shild in shildren) {
      if (shildren.hasOwnProperty(shild) && !processed.includes(shild)) {
        processed.push(shild);
      }
    }
  }

  newProblem.finish = {};
  return newProblem;
}

function run(graph, start, finish) {
  let problem = prepareProblemData(graph, start, finish);
  problem = organize(problem);
  let result = dijkstra.execute(problem);
  let last = result.path.length - 1;
  result.path[0] = start;
  result.path[last] = finish;

  return result;
}

export { run };
