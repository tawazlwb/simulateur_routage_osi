var $chart_area, lastWidth, Graph;

function checkForChanges() {
  if ($chart_area.width() != lastWidth) {
    lastWidth = $chart_area.width();
    let height = $('#graph').height();
    Graph.graph.svg.style('width', lastWidth + 'px');
    Graph.simulation.force(
      'center',
      customModule.d3.forceCenter(lastWidth / 2, height / 2)
    );
    Graph.simulation.restart();
  }

  setTimeout(checkForChanges, 500);
}

$(document).ready(function() {
  $chart_area = $('.chart-area');
  lastWidth = $('.chart-area').width();

  // custom network
  var $restart = $('#restart');
  var $optimal = $('#optimal');

  // draw new custom network
  Graph = customModule.init();

  // correct the svg element width
  customModule.correctSVGWidth(lastWidth);
  checkForChanges();

  $restart.on('click', function() {
    // draw new custom network
    customModule.clearSVG();
    Graph = customModule.init();

    // correct the svg element width
    customModule.correctSVGWidth(lastWidth);
    checkForChanges();
  });

  $optimal.on('click', function() {
    console.log('optimal');
  });
});
