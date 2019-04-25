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
  'X',
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

function randomNumber(min, max) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

function cleanGraph(nodes, list) {
  let links = list.map(function(a) {
    return {
      source: nodes[a[0]].name,
      target: nodes[a[1]].name,
      distance: randomNumber(links_min_value, links_max_value)
    };
  });

  //console.log(links);
  return links;
}

function randomNumber(min, max) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}

function randomNodesLinks(size) {
  var links = [];
  for (let i = 0; i < size; i++) {
    let random = randomNumber(nodes_min_links, nodes_max_links);
    links.push(random);
  }
  return links;
}

function isAlreadyNeighbor(element, links) {
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    if (
      (element[0] === link[0] && element[1] === link[1]) ||
      (element[0] === link[1] && element[1] === link[0])
    ) {
      return true;
    }
  }
  return false;
}

function randomNetwork(nodes) {
  var nodes_link = [];
  let randoms = randomNodesLinks(nodes.length);
  let actuelPos = 0;
  for (let i = 0; i < randoms.length; i++) {
    if (randoms.length - actuelPos < 2) break;
    if (randoms[i] > 0) {
      let nb = 0;
      while (randoms[i] > 0) {
        if (nb > 100) break;
        let pos = randomNumber(actuelPos + 1, randoms.length - 1);
        if (i !== pos && randoms[pos] > 0) {
          if (!isAlreadyNeighbor([i, pos], nodes_link)) {
            nodes_link.push([i, pos]);
            randoms[i] = randoms[i] - 1;
            randoms[pos] = randoms[pos] - 1;
          }
        } else {
          if (randoms.length - actuelPos < 2) break;
          actuelPos++;
        }
        nb++;
      }
      actuelPos++;
    } else {
      continue;
    }
  }
  return nodes_link;
}

function randomLinks(nodes) {
  // Creates random links
  var list = randomNetwork(nodes);

  var singles = [];
  var lastCount = 5,
    last;

  for (let i = 0; i < nodes.length; i++) {
    let count = 0,
      j = 0;
    while (j < list.length) {
      if (list[j][0] === i || list[j][1] === i) {
        count++;
      }
      j++;
    }

    if (count === 0) {
      singles.push(i);
    } else if (count < lastCount) {
      lastCount = count;
      last = i;
    }
  }

  for (let i = 0; i < singles.length - 1; i++) {
    list.push([singles[i], singles[i + 1]]);
  }
  if (singles.length && typeof last !== 'undefined')
    list.push([last, singles[0]]);
  return cleanGraph(nodes, list);
}

function initData(graphData) {
  if (typeof graphData !== 'undefined') {
    // Custom data
    let nodes_data = graphData.nodes_data;
    let links_data = graphData.links_data;
    return { svg, nodes_data, links_data };
  } else {
    // Random data
    let nodes_data = randomNodes(nodes_min_value, nodes_max_value);
    let links_data = randomLinks(nodes_data);
    return { svg, nodes_data, links_data };
  }
}

export { initData };
