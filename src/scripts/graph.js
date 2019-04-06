var d3 = require('d3');
require('d3-selection-multi');
var dataInit = require('./data');

var _graph, _simulation, _path, _circle, _text, _distance;

class Graph {
  constructor(nodes_data, links_data, svg) {
    // nodes data
    this.nodes_data = nodes_data;
    // nodes link data
    this.links_data = links_data;
    // svg
    this.svg = svg;
  }
}

function initGraph(links) {
  var data = dataInit.initData(links);
  _graph = new Graph(data.nodes_data, data.links_data, data.svg);

  //set up the simulation
  _simulation = initSimulation();

  // Init simulation forces
  initFoces();

  // draw graph
  drawGraph();
  _simulation.on('tick', tickActions);
  return {
    graph: _graph,
    simulation: _simulation,
    circle: _circle,
    path: _path,
    text: _text,
    distance: _distance
  };
}

function initSimulation() {
  return d3.forceSimulation().nodes(_graph.nodes_data);
}

function linkDistance() {
  return 80;
}

function linkRealDistance(d) {
  return 20 * d.distance;
}

function initFoces() {
  //add forces
  _simulation
    .force(
      'center',
      d3.forceCenter(
        _graph.svg.attr('width') / 2,
        _graph.svg.attr('height') / 2
      )
    )
    .force(
      'collisionForce',
      d3
        .forceCollide(30)
        .strength(1)
        .iterations(100)
    );
  //Create the link force
  let link_force = d3
    .forceLink(_graph.links_data)
    .distance(linkDistance)
    .strength(1)
    .id(function(d) {
      return d.name;
    });

  _simulation.force('link', link_force);
}

function drawGraph() {
  //draw lines for the links
  let links = _graph.svg
    .append('g')
    .attr('class', 'links')
    .selectAll('g')
    .data(_graph.links_data);
  let link = links.enter().append('g');

  _path = link.append('line');

  _distance = link.append('text');
  _distance
    .style('display', 'none')
    .text(function(d) {
      return d.distance;
    })
    .attrs({
      class: 'text'
    });

  let nodes = _graph.svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('g')
    .data(_graph.nodes_data);
  let node = nodes.enter().append('g');

  _circle = node.append('circle');
  _circle.attrs({ r: 15 });

  _text = node.append('text');
  _text
    .text(function(d) {
      return d.name;
    })
    .attrs({
      class: 'text'
    });
}

function tickActions() {
  //update link positions
  _path.attrs({
    x1: function(d) {
      return d.source.x;
    },
    y1: function(d) {
      return d.source.y;
    },
    x2: function(d) {
      return d.target.x;
    },
    y2: function(d) {
      return d.target.y;
    }
  });

  //update circle positions
  _circle.attrs({
    cx: function(d) {
      return d.x;
    },
    cy: function(d) {
      return d.y;
    }
  });

  //update circles name positions
  _text.attrs({
    dx: function(d) {
      return d.x;
    },
    dy: function(d) {
      return d.y + 6;
    }
  });

  //update links distance positions
  _distance.attrs({
    dx: function(d) {
      return 10 + (d.source.x + d.target.x) / 2;
    },
    dy: function(d) {
      return 10 + (d.source.y + d.target.y) / 2;
    }
  });
}

exports.initGraph = initGraph;
