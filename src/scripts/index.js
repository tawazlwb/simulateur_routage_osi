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

function correctSVGWidth(lastWidth) {
  if (typeof Graph !== 'undefined') {
    let height = Graph.graph.svg.style('height').slice(0, -2);
    Graph.graph.svg.style('width', lastWidth + 'px');
    Graph.simulation.force(
      'center',
      customModule.d3.forceCenter(lastWidth / 2, height / 2)
    );
    Graph.simulation.restart();
  }
}

exports.d3 = d3;
exports.init = init;
exports.clearSVG = clearSVG;
exports.correctSVGWidth = correctSVGWidth;
