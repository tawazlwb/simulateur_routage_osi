$(document).ready(function() {
  $chart_area = $('.chart-area');
  lastWidth = $('.chart-area').width();

  // custom network
  var $start = $('#start');
  var $optimal = $('#optimal');
  var $clear = $('#clear');
  var $nodes_data = $('#nodes_data');
  var $links_data = $('#links_data');
  var $distance = $('#distance');
  var $path = $('#path');

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

  var firstStart = true;
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
      GraphModule = customModule.init(graphData);

      // correct the svg element width
      customModule.correctSVGWidth(lastWidth);
      checkForChanges();

      $optimal.removeClass('disabled');
      $clear.addClass('disabled');
      $distance.text('...');
      $path.text('...');
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
});
