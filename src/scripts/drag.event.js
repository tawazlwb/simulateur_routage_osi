var d3 = require('d3');

var _simulation, _isNodeClicked;

// drag and drop event
function initDragAndDropEvents(simulation, circle, text, isNodeClicked) {
  _simulation = simulation;
  _isNodeClicked = isNodeClicked;
  circle.call(
    d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  );
  text.call(
    d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended)
  );
}

function dragstarted(d, i) {
  if (!d3.event.active) _simulation.alphaTarget(0.3).restart();
  d3.event.subject.fx = d3.event.subject.x;
  d3.event.subject.fy = d3.event.subject.y;
}

function dragged(d, i) {
  d3.event.subject.fx = d3.event.x;
  d3.event.subject.fy = d3.event.y;
}

function dragended(d, i) {
  if (!d3.event.active) _simulation.alphaTarget(0);
  d3.event.subject.fx = null;
  d3.event.subject.fy = null;

  document.body.style.cursor = 'default';
  let self = this;
  if (self instanceof SVGTextElement) {
    d3.selectAll('circle').each(function(d, j) {
      if (j === i) {
        if (!_isNodeClicked[i]) d3.select(this).style('fill', 'white');
      }
    });
  } else if (self instanceof SVGCircleElement) {
    if (!_isNodeClicked[i]) d3.select(this).style('fill', 'white');
  }
}

export { initDragAndDropEvents, dragstarted, dragged, dragended };
