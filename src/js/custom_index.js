var $element, lastWidth;

function checkForChanges() {
  if ($element.width() != lastWidth) {
    lastWidth = $element.width();
    $('#pdf').width(lastWidth);
  }

  setTimeout(checkForChanges, 500);
}

$(document).ready(function() {
  $element = $('.chart-area');
  lastWidth = $('.chart-area').width();
  $('#pdf').width(lastWidth);
  checkForChanges();
});
