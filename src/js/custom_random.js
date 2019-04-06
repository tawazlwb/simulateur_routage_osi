var $chart_area, lastWidth, GraphModule;

function checkForChanges() {
  if ($chart_area.width() != lastWidth) {
    lastWidth = $chart_area.width();
    let height = $('#graph').height();
    GraphModule.Graph.graph.svg.style('width', lastWidth + 'px');
    GraphModule.Graph.simulation.force(
      'center',
      customModule.d3.forceCenter(lastWidth / 2, height / 2)
    );
    GraphModule.Graph.simulation.restart();
  }

  setTimeout(checkForChanges, 500);
}

function countSelectedNode() {
  let count = 0;
  if (typeof GraphModule !== 'undefined') {
    GraphModule.isNodeClicked.forEach(function(isClicked, index) {
      if (isClicked) {
        ++count;
        /* console.log(
          index + ': ' + GraphModule.Graph.simulation.nodes()[index].name
        ); */
      }
    });
    return count;
  }
}

function CheckNodes() {
  let count = countSelectedNode();
  if (count == 0 || count == 1 || count > 2) {
    console.log(
      'You must select 2 nodes to start Dijkstra algorithm simulation!'
    );
  } else {
    console.log('You can start!');
  }
}

$(document).ready(function() {
  $chart_area = $('.chart-area');
  lastWidth = $('.chart-area').width();

  // custom network
  var $restart = $('#restart');
  var $optimal = $('#optimal');

  // draw new custom network
  GraphModule = customModule.init();

  // correct the svg element width
  customModule.correctSVGWidth(lastWidth);
  checkForChanges();

  $restart.on('click', function() {
    // draw new custom network
    customModule.clearSVG();
    GraphModule = customModule.init();

    // correct the svg element width
    customModule.correctSVGWidth(lastWidth);
    checkForChanges();
  });

  $optimal.on('click', function() {
    console.log('optimal');
    CheckNodes();
  });
});
