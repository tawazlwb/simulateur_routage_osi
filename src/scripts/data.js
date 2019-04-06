var d3 = require('d3');

//create somewhere to put the force directed graph
var svg = d3.select('svg');

// nodes data
var nodes_data = [
  { name: 'A' },
  { name: 'B' },
  { name: 'C' },
  { name: 'D' },
  { name: 'E' },
  { name: 'F' }
];

// nodes link data
var links_data = [
  { source: 'A', target: 'B', distance: 7 },
  { source: 'A', target: 'C', distance: 9 },
  { source: 'A', target: 'F', distance: 14 },
  { source: 'B', target: 'C', distance: 10 },
  { source: 'B', target: 'D', distance: 15 },
  { source: 'C', target: 'D', distance: 11 },
  { source: 'C', target: 'F', distance: 5 },
  { source: 'D', target: 'E', distance: 6 },
  { source: 'E', target: 'F', distance: 9 }
];

function initData(graphData) {
  if (typeof graphData !== 'undefined') {
    // Custom data
    let nodes_data = graphData.nodes_data;
    let links_data = graphData.links_data;
    return { svg, nodes_data, links_data };
  } else {
    // Random data
    return { svg, nodes_data, links_data };
  }
}

export { initData };
