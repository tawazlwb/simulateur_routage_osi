var d3 = require('d3');

// path events
function initPathEvents(path, isPathClicked) {
  path
    .on('mouseover', function(d, i) {
      document.body.style.cursor = 'pointer';
      d3.select(this).style('stroke', 'orange');
      d3.selectAll('text').each(function(d, j) {
        if (j === i) {
          d3.select(this).style('display', 'block');
        }
      });
    })
    .on('mouseout', function(d, i) {
      document.body.style.cursor = 'default';
      if (!isPathClicked[i]) {
        d3.select(this).style('stroke', 'black');
        d3.selectAll('text').each(function(d, j) {
          if (j === i) {
            d3.select(this).style('display', 'none');
          }
        });
      }
    })
    .on('click', function(d, i) {
      d3.selectAll('text').each(function(d, j) {
        if (j === i) {
          d3.select(this).style('display', 'block');
        }
      });
      d3.select(this).style('stroke', 'orange');
      isPathClicked[i] = !isPathClicked[i];
    });
}

exports.initPathEvents = initPathEvents;
