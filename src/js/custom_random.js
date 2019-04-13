$(document).ready(function() {
  $chart_area = $('.chart-area');
  lastWidth = $('.chart-area').width();

  // custom network
  var $optimal = $('#optimal');
  var $restart = $('#restart');
  var $clear = $('#clear');
  var $distance = $('#distance');
  var $path = $('#path');

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

    $optimal.removeClass('disabled');
    $clear.addClass('disabled');
    $distance.text('...');
    $path.text('...');
  });
});
