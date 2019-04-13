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

function run(graph, start, finish) {
  let problem = prepareProblemData(graph, start, finish);
  let result = dijkstra.execute(problem);
  let last = result.path.length - 1;
  result.path[0] = start;
  result.path[last] = finish;

  return result;
}

export { run };
