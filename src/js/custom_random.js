var $chart_area, lastWidth;

function checkForChanges() {
  if ($chart_area.width() != lastWidth) {
    console.log('xxx');
    lastWidth = $chart_area.width();
    let height = $('#graph').height();
    customModule.graph.svg.style('width', lastWidth + 'px');
    customModule.simulation.force(
      'center',
      customModule.d3.forceCenter(lastWidth / 2, height / 2)
    );
    customModule.simulation.restart();
  }

  setTimeout(checkForChanges, 500);
}

function centerSVG() {
  let height = $('#graph').height();
  customModule.graph.svg.style('width', lastWidth + 'px');
  customModule.simulation.force(
    'center',
    customModule.d3.forceCenter(lastWidth / 2, height / 2)
  );
  customModule.simulation.restart();
}

$(document).ready(function() {
  $chart_area = $('.chart-area');
  lastWidth = $('.chart-area').width();

  //centerSVG();
  //checkForChanges();

  // custom network
  var $start = $('#start');
  var $optimal = $('#optimal');
  var $nodes_data = $('#nodes_data');
  var $links_data = $('#links_data');

  $nodes_data.on('click', function() {
    if (
      $nodes_data.val() === 'Missing data!' ||
      $nodes_data.val() ===
        'You must input the node data as shown in the helper!'
    ) {
      $nodes_data.removeClass('text-danger');
      $nodes_data.val('');
    }
  });
  $links_data.on('click', function() {
    if (
      $links_data.val() === 'Missing data!' ||
      $links_data.val() ===
        'You must input the link data as shown in the helper!'
    ) {
      $links_data.removeClass('text-danger');
      $links_data.val('');
    }
  });

  $start.on('click', function() {
    if ($nodes_data.val().length !== 0 && $links_data.val().length !== 0) {
      let nodeData, linkData;
      try {
        nodeData = JSON.parse($nodes_data.val());
      } catch (error) {
        $nodes_data.addClass('text-danger');
        $nodes_data.val('You must input the node data as shown in the helper!');
        return;
      }
      try {
        linkData = JSON.parse($links_data.val());
      } catch (error) {
        $links_data.addClass('text-danger');
        $links_data.val('You must input the link data as shown in the helper!');
        return;
      }
      let graphData = { nodes_data: nodeData, links_data: linkData };

      // draw the custom network
      customModule.clearSVG();
      customModule.init(graphData);
    } else {
      if ($nodes_data.val().length === 0) {
        $nodes_data.addClass('text-danger');
        $nodes_data.val('Missing data!');
      }
      if ($links_data.val().length === 0) {
        $links_data.addClass('text-danger');
        $links_data.val('Missing data!');
      }
    }
  });
  $optimal.on('click', function() {
    console.log('optimal');
  });
});
