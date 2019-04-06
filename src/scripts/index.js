var d3 = require('d3');
import G from './graph';
import * as eventVars from './var.event';
import * as dragEvents from './drag.event';
import * as pathsEvents from './path.event';
import * as nodesEvents from './node.event';

var Graph;

function init(customLinkData) {
  Graph = G.initGraph(customLinkData);

  var isNodeClicked = eventVars.initNodeClick(Graph.graph.nodes_data.length);
  var isPathClicked = eventVars.initPathClick(Graph.graph.links_data.length);
  dragEvents.initDragAndDropEvents(
    Graph.simulation,
    Graph.circle,
    Graph.text,
    isNodeClicked
  );
  pathsEvents.initPathEvents(Graph.path, isPathClicked);
  nodesEvents.initNodeEvents(
    Graph.circle,
    Graph.text,
    isNodeClicked,
    isPathClicked
  );
  return Graph;
}

function clearSVG() {
  if (typeof Graph !== 'undefined') {
    Graph.graph.svg.selectAll('*').remove();
  }
}

//init();

exports.d3 = d3;
exports.init = init;
exports.clearSVG = clearSVG;

// for development testing only
/* exports.graph = Graph.graph;
exports.simulation = Graph.simulation;
exports.circle = Graph.circle;
exports.path = Graph.path;
exports.text = Graph.text;
exports.distance = Graph.distance; */
