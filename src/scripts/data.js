var d3 = require('d3');

//create somewhere to put the force directed graph
var svg = d3.select('svg');

// node possible names
var names = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'W',
  'Y',
  'Z',
  'AA',
  'AB',
  'AC',
  'AD'
];
// node number constraint
var nodes_min_value = 10;
var nodes_max_value = 30;

// node link constraint
var nodes_min_links = 1;
var nodes_max_links = 5;

// link value constraint
var links_min_value = 1;
var links_max_value = 99;

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
  { source: 'C', target: 'F', distance: 5 }
  //{ source: 'D', target: 'E', distance: 6 },
  //{ source: 'E', target: 'F', distance: 9 }
];

function randomNumber(min, max) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

function randomNodes(min, max) {
  let nodes_number = randomNumber(min, max);
  let nodes_data = [];
  for (let i = 0; i < nodes_number; i++) {
    let node_name = { name: names[i] };
    nodes_data.push(node_name);
  }
  return nodes_data;
}

function countNodeLinks(node, links_data) {
  //let el
  // https://www.kaggle.com/vfdev5/pair-code-facets-data-visualization
  for (let i = 0; i < links_data.length; i++) {
    const link = links_data[i];
    if (node.name === link.source) {
    }
  }
}

function randomLinks(nodes) {
  let links_data = [];
  for (let i = 0; i < nodes.length; i++) {
    let nodes_data = nodes.slice(0);
    let node = nodes_data[i];
    let node_link_number = randomNumber(nodes_min_links, nodes_max_links);
  }

  return null;
}

function initData(graphData) {
  if (typeof graphData !== 'undefined') {
    // Custom data
    let nodes_data = graphData.nodes_data;
    let links_data = graphData.links_data;
    return { svg, nodes_data, links_data };
  } else {
    // Random data
    let nodes_datas = randomNodes(nodes_min_value, nodes_max_value);

    return { svg, nodes_data, links_data };
  }
}

export { initData };
